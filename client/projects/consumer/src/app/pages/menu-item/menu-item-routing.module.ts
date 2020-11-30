import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuItemPage } from './menu-item.page';
import { MenuItemResolver } from './services/menu-item.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: MenuItemPage,
    resolve: { item: MenuItemResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuItemPageRoutingModule {}
