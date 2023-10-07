import cron from 'node-cron';
import axios from 'axios';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ListenTwitterInput, GetMentionNotificationInput } from '@/modules/twitter/input';
import { TwitterListenResponse, GetMentionNotificationResponse } from '@/modules/twitter/response';

const HEADERS = {
  'content-type': "application/json",
  'accept': "application/json",
  'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
  'User-Agent': 'twit-client',
  'X-Csrf-Token': process.env.CSRF_TOKEN,
  'Cookie': `auth_token=${process.env.AUTH_TOKEN}; ct0=${process.env.CSRF_TOKEN};`,
};

const getMentionn = () => {
  const config = {
    withCredentials: true,
    headers: HEADERS,
  };

  axios.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json', config)
    .then(response => {
      console.log('response getMentionn', response.data);
    }).catch(error => {
      console.log('error getMentionn response data', error.response.data);
    });
};

const getTweet = (id: string) => {
  const config = {
    withCredentials: true,
    headers: HEADERS,
  };

  axios.get(`https://twitter.com/i/api/graphql/g-nnNwMkZpmrGbO2Pk0rag/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${id}%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`, config)
    .then(response => {
      console.log('response getTweet', response.data.data.threaded_conversation_with_injections_v2.instructions[0].entries[0].content.itemContent.tweet_results.result.legacy.full_text);
    }).catch(error => {
      console.log('error getTweet response data', error.response.data);
    });
};

enum ListenerStatus {
  SLEEP = 'sleep',
  ACTIVE = 'active',
}

interface ListenerState {
  status: ListenerStatus;
  cronInterval: string;
}

class Listener {
  private _status = ListenerStatus.SLEEP;
  private _cronInterval = '* * * * *';
  private _cron = cron.schedule(this._cronInterval, () => {
    console.log(`running a task on ${this._cronInterval}`);
  });

  public get state(): ListenerState {
    return { status: this._status, cronInterval: this._cronInterval };
  }

  public activate() {
    this._cron.start();
    this._status = ListenerStatus.ACTIVE;
    console.log('[INFO - Listener] Activated cron!');
  }

  public terminate() {
    this._cron.stop();
    this._status = ListenerStatus.SLEEP;
    console.log('[INFO - Listener] Stopped cron!');
  }

  public setCronInterval(newCron: string) {
    if (cron.validate(newCron)) {
      this._cronInterval = newCron;
    } else {
      console.log(`[ERROR] ${newCron} is not a valid cron string format interval`);
    };
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
    getMentionn();
    getTweet('1708803559876427900');

    console.log('[INFO - Listener] Get Mention Notification!');
    console.log('action', action);
    return {
      result: 'response',
    };
  }
}
