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

  async get<T extends object>(): Promise<T[]> {
    await this.openStore();

    const { keys } = await this.storage.keys();
    const { values } = await this.storage.values();
    const parsedValues = values.map((value, idx) => ({ [keys[idx]]: JSON.parse(value) }));

    return Object.assign({}, ...parsedValues);
  }

  async set<T extends object>({ value }: { value: T }) {
    const toStore = Object.entries(value).map(([key, val]) => [key, JSON.stringify(val)]);
    return this.openStore().then(() => Promise.all(toStore.map(([key, val]) => this.storage.set({ key, value: val }))));
  }
}
