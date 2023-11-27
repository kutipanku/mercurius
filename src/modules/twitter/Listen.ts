import axios from 'axios';
import { TwitterApi } from 'twitter-api-v2';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { ListenTwitterInput, GetMentionNotificationInput } from '@/modules/twitter/input';
import { TwitterListenResponse, GetMentionNotificationResponse, TweetDetailResponse } from '@/modules/twitter/response';

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
    return {
      status: 'success',
      message: postedTweet,
      location: 'sendTweet',
    };
  } catch (error) {
    console.log('[LOG - Twitter] -- sendTweet -- | error', error.data);
    return {
      status: 'success',
      message: error.data,
      location: 'sendTweet',
    };
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
    }
    return {
      status: 'success',
      message: answer,
      location: 'getOpenAiAnswer',
    };
  } catch (error) {
    console.log('[LOG - OpenAI] -- getOpenAiAnswer -- | error', error);
    return {
      status: 'error',
      message: error,
      location: 'getOpenAiAnswer',
    };
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
    return {
      status: 'success',
      message: response.data,
      location: 'getMention',
    };
  } catch (error) {
    console.log('[LOG - Twitter] -- getMention -- | error', error.response.data);
    return {
      status: 'error',
      message: error.response.data,
      location: 'getMention',
    };
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
    const tweetMedia = response.data?.data?.threaded_conversation_with_injections_v2?.instructions[0]?.entries[0]?.content?.itemContent?.tweet_results?.result?.legacy?.entities?.media || [];
    const parsedTweetMedia = tweetMedia.map((media?: { media_url_https: string }) => media?.media_url_https || '');
    console.log('[LOG - Twitter] -- getTweet -- | tweetContent', tweetContent);
    return {
      status: 'success',
      message: tweetContent,
      location: 'getTweet',
      media: parsedTweetMedia
    };
  } catch (error) {
    console.log('[LOG - Twitter] -- getTweet -- | error', error.response.data);
    return {
      status: 'error',
      message: error.response.data,
      location: 'getTweet',
      media: []
    };
  }
};

enum ListenerStatus {
  SLEEP = 'sleep',
  ACTIVE = 'active',
}

interface ListenerState {
  status: ListenerStatus;
  cronInterval: number;
  logs: string[];
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
  private _errorLog: string[] = [];

  public get state(): ListenerState {
    return { status: this._status, cronInterval: this._cronInterval, logs: this._errorLog };
  }

  public activate() {
    clearInterval(this._intervalId);

    this._intervalId = setInterval(async () => {

      // Only start the concurent process on active flag
      if (this._status === ListenerStatus.ACTIVE) {
        console.log(`[LOG - TWITTER] Running a task every ${this._cronInterval}ms`);

        const mentionResponse = await getMention();
        if (mentionResponse.status === 'error') {
          this._errorLog.push(JSON.stringify({ message: mentionResponse.message, location: mentionResponse.location }));
        }

        const normalizedData: MentionStash[] = mentionResponse.message.map((mention: { id_str: string, conversation_id_str: string }) => {
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
              console.log('[LOG - TWITTER] Found new mention!', mention.mentionId);
              unRepliedMentions.push(mention);
            };
          });

          if (unRepliedMentions.length === 0) {
            console.log('[LOG - TWITTER] No new mention');
          } else {
            unRepliedMentions.forEach(async replyingMention => {
              const tweetContent = await getTweet(replyingMention.conversationId);
              if (tweetContent.status === 'error') {
                this._errorLog.push(JSON.stringify({ message: tweetContent.message, location: tweetContent.location }));
              }

              this._stashedMention.push(replyingMention);
              console.log('[LOG - TWITTER] response', tweetContent);

              const botAnswer = await getOpenAiAnswer(tweetContent.message);
              if (botAnswer.status === 'error') {
                this._errorLog.push(JSON.stringify({ message: botAnswer.message, location: botAnswer.location }));
              }

              const sentTweet = await sendTweet(botAnswer.message, replyingMention.mentionId);
              if (sentTweet.status === 'error') {
                this._errorLog.push(JSON.stringify({ message: sentTweet.message, location: sentTweet.location }));
              }

              return sentTweet.message;
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
    if (this._status !== 'sleep') this.activate();
  }

  public clearLog() {
    this._errorLog = [];
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
    switch (action) {
      case 'activate':
        this.listener.activate();
        return {
          message: `Success ${action}!`,
          cronInterval: this.listener.state.cronInterval,
          status: this.listener.state.status,
          logs: this.listener.state.logs,
        };
      case 'change_interval':
        this.listener.setCronInterval(cronInterval);
        return {
          message: `Success ${action}!`,
          cronInterval: this.listener.state.cronInterval,
          status: this.listener.state.status,
          logs: this.listener.state.logs,
        };
      case 'check':
        return {
          message: `Success ${action}!`,
          cronInterval: this.listener.state.cronInterval,
          status: this.listener.state.status,
          logs: this.listener.state.logs,
        };
      default:
        this.listener.terminate();
        return {
          message: `Success ${action}!`,
          cronInterval: this.listener.state.cronInterval,
          status: this.listener.state.status,
          logs: []
        };
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

  /* ------------------------------------
  => Get listener state
  ------------------------------------ */
  @Query(() => TwitterListenResponse)
  async getMentionListenerState(): Promise<TwitterListenResponse | null> {
    return {
      message: 'Success check!',
      cronInterval: this.listener.state.cronInterval,
      status: this.listener.state.status,
      logs: this.listener.state.logs,
    };
  }

  /* ------------------------------------
  => Get listener state
  ------------------------------------ */
  @Query(() => TweetDetailResponse)
  async getTweetDetail(@Arg('id') id: string): Promise<TweetDetailResponse | null> {
    console.log('[DEBUG] running getTweetDetail');
    const { message, media } = await getTweet(id);

    return { content: message, media };
  }
}
