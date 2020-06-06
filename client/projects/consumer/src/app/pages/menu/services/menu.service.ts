import { Injectable } from '@angular/core';

import { BaseCrudService, MenuInterface } from 'dist/library';

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseCrudService<MenuInterface> {
  protected base = '/menus';
}
