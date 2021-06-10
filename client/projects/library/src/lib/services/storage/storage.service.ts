import { Inject, Injectable } from '@angular/core';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';

import { CONFIG, Config } from '../../config/config';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = CapacitorDataStorageSqlite;

  constructor(@Inject(CONFIG) private readonly config: Config) {}

  private openStore() {
    return this.storage.openStore({ database: this.config.localDbName, table: 'state' });
  }

  async get<T extends object>(): Promise<T> {
    try {
      await this.openStore();

      const { keys } = await this.storage.keys();
      const { values } = await this.storage.values();

      const parsedValues = values?.map((value, idx) => ({
        [keys[idx]]: value === 'null' ? null : value.startsWith(`{`) ? JSON.parse(value) : value,
      }));

      const obj = Object.assign({}, ...(parsedValues ?? []));

      return Object.entries(obj)
        .filter(([key]) => !(!key || typeof key === 'undefined' || key === 'undefined'))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as T);
    } catch (error) {
      console.log(error);
    }
  }

  async set<T extends object>({ value }: { value: T }) {
    const toStore = Object.entries(value).map(([key, val]) => [key, typeof val === 'object' ? JSON.stringify(val) : val]);
    return this.openStore().then(() => Promise.all(toStore.map(([key, val]) => this.storage.set({ key, value: val }))));
  }

  async setToken({ token }: { token: string }) {
    return this.openStore()
      .then(() => this.storage.set({ key: 'token', value: token }))
      .then((value) => value.result);
  }

  async getToken() {
    return this.get().then((store: StoreInterface) => store?.user?.token ?? store.token);
  }
}

type Token = Record<'token', string>;

interface StoreInterface extends Partial<Token> {
  user?: Token;
}
