import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'menu' },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'orders-history',
        loadChildren: () => import('../orders-history/orders-history.module').then((m) => m.OrdersHistoryPageModule),
      },
      { path: '**', redirectTo: 'menu' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
