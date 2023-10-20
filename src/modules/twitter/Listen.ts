import axios from 'axios';
import { TwitterApi } from 'twitter-api-v2';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ListenTwitterInput, GetMentionNotificationInput } from '@/modules/twitter/input';
import { TwitterListenResponse, GetMentionNotificationResponse } from '@/modules/twitter/response';

const sendTweet = async (text: string, id: string) => {
  const client = new TwitterApi({
    appKey: process.env.API_KEY || '',
    appSecret: process.env.API_KEY_SECRET || '',
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
  });

  console.log('[LOG - Twitter] -- sendTweet -- | text', text);
  console.log('[LOG - Twitter] -- sendTweet -- | id', id);

  try {
    const postedTweet = await client.v2.reply(text, id);
    console.log('[LOG - Twitter] -- sendTweet -- | postedTweet', postedTweet);
    return postedTweet;
  } catch (error) {
    console.log('[LOG - Twitter] -- sendTweet -- | error', error.data);
    return error.data;
  }
};

const getOpenAiAnswer = async (tweet: string) => {
  const openAiConfig = {
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Reply only in Bahasa Indonesia'
      },
      {
        role: 'user',
        content: `Create summary to the text delimited by tripple quote. """${tweet}"""`
      },
      {
        role: 'user',
        content: 'Find a short quote from famous person or proverb related to that'
      }
    ],
    temperature: 0.7
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', body, openAiConfig);
    const answer = response?.data?.choices[0]?.message?.content || '';
    if (answer !== null) {
      console.log('[LOG - OpenAI] got response!', response.data);
      console.log('[LOG - OpenAI] got choices!', response.data.choices);
      console.log('[LOG - OpenAI] answer', answer);
      return answer;
    }
    return '';
  } catch (error) {
    console.log('[LOG - OpenAI] -- getOpenAiAnswer -- | error', error);
    return '';
  }
};

const getMention = async () => {
  const config = {
    withCredentials: true,
    headers: {
      'content-type': "application/json",
      'accept': "application/json",
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'User-Agent': 'twit-client',
      'X-Csrf-Token': process.env.CSRF_TOKEN,
      'Cookie': `auth_token=${process.env.AUTH_TOKEN}; ct0=${process.env.CSRF_TOKEN};`,
    },
  };

  try {
    const response = await axios.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json', config);
    console.log('[LOG - Twitter] -- getMention -- | response.data', response.data);
    return response.data;
  } catch (error) {
    console.log('[LOG - Twitter] -- getMention -- | error', error.response.data);
    return '';
  }
};

const getTweet = async (id: string) => {
  const config = {
    withCredentials: true,
    headers: {
      'content-type': "application/json",
      'accept': "application/json",
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'User-Agent': 'twit-client',
      'X-Csrf-Token': process.env.CSRF_TOKEN,
      'Cookie': `auth_token=${process.env.AUTH_TOKEN}; ct0=${process.env.CSRF_TOKEN};`,
    },
  };

  try {
    const response = await axios.get(`https://twitter.com/i/api/graphql/g-nnNwMkZpmrGbO2Pk0rag/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${id}%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`, config);
    const tweetContent = response.data?.data?.threaded_conversation_with_injections_v2?.instructions[0]?.entries[0]?.content?.itemContent?.tweet_results?.result?.legacy?.full_text || '';
    console.log('[LOG - Twitter] -- getTweet -- | tweetContent', tweetContent);
    return tweetContent;
  } catch (error) {
    console.log('[LOG - Twitter] -- getTweet -- | error', error.response.data);
    return ''
  }
};

enum ListenerStatus {
  SLEEP = 'sleep',
  ACTIVE = 'active',
}

interface ListenerState {
  status: ListenerStatus;
  cronInterval: number;
}

interface MentionStash {
  mentionId: string;
  conversationId: string
}

class Listener {
  private _status = ListenerStatus.SLEEP;
  private _isInitialStart = true;
  private _cronInterval = 13000;
  private _intervalId: any;
  private _stashedMention: MentionStash[] = [];

  public get state(): ListenerState {
    return { status: this._status, cronInterval: this._cronInterval };
  }

  public activate() {
    clearInterval(this._intervalId);
    // const config = {
    //   withCredentials: true,
    //   headers: {
    //     'content-type': "application/json",
    //     'accept': "application/json",
    //     'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
    //     'User-Agent': 'twit-client',
    //     'X-Csrf-Token': process.env.CSRF_TOKEN,
    //     'Cookie': `auth_token=${process.env.AUTH_TOKEN}; ct0=${process.env.CSRF_TOKEN};`,
    //   },
    // };
    this._intervalId = setInterval(async () => {
      // if (this._status === ListenerStatus.ACTIVE) {
      //   console.log(`running a task revery ${this._cronInterval}ms`);
      //   axios.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json', config)
      //     .then(response => {
      //       const normalizedData: MentionStash[] = response.data.map((mention: { id_str: string, conversation_id_str: string }) => {
      //         return {
      //           mentionId: mention.id_str,
      //           conversationId: mention.conversation_id_str
      //         }
      //       });
      //       console.log('[LOG - TWITTER] Normalized response of getMentionn', normalizedData);
      //       if (this._isInitialStart) {
      //         this._isInitialStart = false;
      //         this._stashedMention = normalizedData;
      //         console.log('[LOG - TWITTER] Successfully initialized mention stash', normalizedData);
      //       } else {
      //         const unRepliedMentions: MentionStash[] = [];
      //         normalizedData.forEach(mention => {
      //           const matchedMention = this._stashedMention.find(stashedMention => {
      //             return stashedMention.mentionId === mention.mentionId;
      //           });

      //           if (!matchedMention) {
      //             console.log('Found new mention!', mention.mentionId);
      //             unRepliedMentions.push(mention);
      //           };
      //         });

      //         if (unRepliedMentions.length === 0) {
      //           console.log('[LOG - TWITTER] No new mention found');
      //         } else {
      //           unRepliedMentions.forEach(replyingMention => {
      //             axios.get(`https://twitter.com/i/api/graphql/g-nnNwMkZpmrGbO2Pk0rag/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${replyingMention.conversationId}%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`, config)
      //               .then(async response => {
      //                 this._stashedMention.push(replyingMention);
      //                 const tweet = response.data.data.threaded_conversation_with_injections_v2.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.full_text;
      //                 console.log('[LOG - TWITTER] response', tweet);
      //                 const openAiConfig = {
      //                   withCredentials: true,
      //                   headers: {
      //                     'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      //                   }
      //                 };

      //                 const body = {
      //                   model: 'gpt-3.5-turbo',
      //                   messages: [
      //                     {
      //                       role: 'user',
      //                       content: `Create summary in Bahasa Indonesia to the text delimited by tripple quote. """${tweet}"""`
      //                     },
      //                     {
      //                       role: 'user',
      //                       content: 'Find a short quote from famous person or proverb related to that'
      //                     }
      //                   ],
      //                   temperature: 0.7
      //                 }

      //                 axios.post('https://api.openai.com/v1/chat/completions', body, openAiConfig).then((openAiResponse: any) => {
      //                   const answer = openAiResponse.data.choices[0].message.content;
      //                   if (answer !== null) {
      //                     console.log('[LOG - OPENAI] got response!', openAiResponse.data);
      //                     console.log('[LOG - OPENAI] got choices!', openAiResponse.data.choices);
      //                     console.log('[LOG - OPENAI] answer', answer);
      //                     sendTweet(answer, replyingMention.mentionId);
      //                   }
      //                 }).catch(error => {
      //                   console.log('[LOG - OPENAI] error get answer', error);
      //                 })
      //               }).catch(error => {
      //                 console.log('[LOG - TWITTER] error getTweet response data', error);
      //               });
      //           });
      //         }
      //       }
      //     }).catch(error => {
      //       console.log('error getMentionn response data', error.response.data);
      //     });
      // }

      // Only start the concurent process on active flag
      if (this._status === ListenerStatus.ACTIVE) {
        console.log(`running a task revery ${this._cronInterval}ms`);

        const mentionResponse = await getMention();
        const normalizedData: MentionStash[] = mentionResponse.map((mention: { id_str: string, conversation_id_str: string }) => {
          return {
            mentionId: mention.id_str,
            conversationId: mention.conversation_id_str
          }
        });
        console.log('[LOG - TWITTER] Normalized response of getMentionn', normalizedData);

        // Populate stash with current mentions
        if (this._isInitialStart) {
          this._isInitialStart = false;
          this._stashedMention = normalizedData;

          console.log('[LOG - TWITTER] Successfully initialized mention stash', normalizedData);
        } else {
          const unRepliedMentions: MentionStash[] = [];

          normalizedData.forEach(mention => {
            const matchedMention = this._stashedMention.find(stashedMention => {
              return stashedMention.mentionId === mention.mentionId;
            });
            if (!matchedMention) {
              console.log('Found new mention!', mention.mentionId);
              unRepliedMentions.push(mention);
            };
          });

          if (unRepliedMentions.length === 0) {
            console.log('[LOG - TWITTER] No new mention');
          } else {
            unRepliedMentions.forEach(async replyingMention => {
              const tweetContent = await getTweet(replyingMention.conversationId);

              this._stashedMention.push(replyingMention);
              console.log('[LOG - TWITTER] response', tweetContent);

              const botAnswer = await getOpenAiAnswer(tweetContent);

              const sentTweet = await sendTweet(botAnswer, replyingMention.mentionId);

              return sentTweet;
            });
          }
        }
      }
    }, this._cronInterval);
    this._status = ListenerStatus.ACTIVE;
    console.log('[INFO - Listener] Activated cron!');
  }

  public terminate() {
    clearInterval(this._intervalId);
    this._status = ListenerStatus.SLEEP;
    console.log('[INFO - Listener] Stopped cron!');
  }

  public setCronInterval(newCron: number) {
    this._cronInterval = newCron;
    this.activate();
  }
}

const retrieveListenerInstance = () => {
  let instance: Listener;

  function createInstance() {
    const listener = new Listener();
    return listener;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}

@Resolver()
export class ListenTwitterResolver {
  private instance = retrieveListenerInstance();
  private listener = this.instance.getInstance();

  /* ------------------------------------
  => Listen to any notification or mention
  ------------------------------------ */
  @Mutation(() => TwitterListenResponse)
  async listenNotification(
    @Arg('data')
    { action, cronInterval }: ListenTwitterInput
  ): Promise<TwitterListenResponse> {
    if (cronInterval) {
      this.listener.setCronInterval(cronInterval);
    }

    if (action === 'activate') {
      this.listener.activate();
    } else {
      this.listener.terminate();
    }

    return {
      message: "Success!",
      cronInterval,
      status: this.listener.state.status
    }
  }

  /* ------------------------------------
  => Listen to any notification or mention
  ------------------------------------ */
  @Mutation(() => GetMentionNotificationResponse)
  async getMentionNotification(
    @Arg('data')
    { action }: GetMentionNotificationInput
  ): Promise<GetMentionNotificationResponse> {
    // const answer = await getMention();
    const answer = await getTweet('1708803559876427900');
    // const answer = await sendTweet('Halo test!', '1710969348716929304');
    // const answer = await getOpenAiAnswer(action);

    console.log('[INFO - Listener] Get Mention Notification!');
    console.log('action', action);
    return {
      result: JSON.stringify(answer),
    };
  }
}
