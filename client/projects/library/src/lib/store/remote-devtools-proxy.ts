import { ReduxDevtoolsExtension, ReduxDevtoolsExtensionConnection } from '@ngrx/store-devtools/src/extension';
import { RemoteDevToolsConnectionProxy } from './remote-devtools-connection-proxy';
import { connect } from 'remotedev/lib/devTools';

export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {
  remotedev: any = null;
  defaultOptions = {
    realtime: true,
    // Needs to match what you run `remotedev` command with and
    // what you setup in remote devtools local connection settings
    hostname: '192.168.100.22',
    port: 8000,
    autoReconnect: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    secure: true,
  };

  constructor(defaultOptions: Object) {
    this.defaultOptions = Object.assign(this.defaultOptions, defaultOptions);
  }

  connect(options): ReduxDevtoolsExtensionConnection {
    const connectOptions = Object.assign(this.defaultOptions, options);

    this.remotedev = connect(connectOptions);

    const connectionProxy = new RemoteDevToolsConnectionProxy(this.remotedev, connectOptions.instanceId);
    return connectionProxy;
  }

  send(action: any, state: any): any {
    this.remotedev.send(action, state);
  }
}
