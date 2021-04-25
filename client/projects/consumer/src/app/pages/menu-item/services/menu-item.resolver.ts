import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ItemInterface } from 'dist/library/library';
import { Observable } from 'rxjs';
import { MenuItemService } from './menu-item.service';

@Injectable({ providedIn: 'root' })
export class MenuItemResolver implements Resolve<ItemInterface> {
  constructor(private readonly service: MenuItemService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ItemInterface> {
    return this.service.getById(route.params.id);
  }
}
