import cron from 'node-cron';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ListenTwitterInput } from '@/modules/twitter/input';
import { TwitterListenResponse } from '@/modules/twitter/response';

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
}
