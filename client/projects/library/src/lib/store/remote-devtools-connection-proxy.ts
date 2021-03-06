import { ReduxDevtoolsExtensionConnection } from '@ngrx/store-devtools/src/extension';

export class RemoteDevToolsConnectionProxy implements ReduxDevtoolsExtensionConnection {
  constructor(public remotedev: any, public instanceId: string) {}
  init(state?: any): void {
    console.log({ state });
  }
  error(anyErr: any): void {
    console.log({ anyErr });
  }

  subscribe(listener: (change: any) => void): any {
    const listenerWrapper = (change: any) => {
      listener(change);
    };

    this.remotedev.subscribe(listenerWrapper);
    // Hack fix for commit/time-travelling etc. if the devtools are already open
    setTimeout(() => listenerWrapper({ type: 'START' }));
  }

  unsubscribe(): any {
    // HACK fix bug in @ngrx/store-devtools that calls this instead of returning
    // a lambda that calls it when their Observable wrapper is unsubscribed.
    return () => this.remotedev.unsubscribe(this.instanceId);
  }

  send(action: any, state: any): any {
    // Never called
  }
}
