import { Injectable } from '@angular/core';

import { BaseCrudService, ItemInterface } from 'dist/library';

@Injectable({ providedIn: 'root' })
export class MenuItemService extends BaseCrudService<ItemInterface> {
  protected readonly base = '/items';

  getAllItemsByMenuId(menuId: string) {
    return super.read({ menuId });
  }

  getAllItemsByCategoryId(categoryId: string) {
    return super.read({ categoryId });
  }

  getAllItemsByMenuIds(menuIds: string[]) {
    return super.read({ menuIds });
  }

  getAllItemsByCategoryIds(categoryIds: string[]) {
    return super.read({ categoryIds });
  }
}
