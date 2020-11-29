import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService, isNotEmpty, MenuInterface } from 'dist/library';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuItemService } from '../../menu-item/services/menu-item.service';

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseCrudService<MenuInterface> {
  protected base = '/menus';
  constructor(protected readonly httpClient: HttpClient, private readonly menuItemsService: MenuItemService) {
    super(httpClient);
  }

  menuWithItems(): Observable<MenuInterface[]> {
    return combineLatest([this.read(), this.menuItemsService.read()]).pipe(
      filter(([menus, items]) => isNotEmpty(menus) && isNotEmpty(items)),
      map(([menus, items]) => {
        return menus.map((menu) => ({
          ...menu,
          categories: menu.categories.map((category) => ({ ...category, items: items.filter((item) => item.categoryId === category._id) })),
        }));
      })
    );
  }
}
