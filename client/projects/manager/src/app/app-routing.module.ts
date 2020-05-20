import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/orders' },
  { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersPageModule) },
  {
    path: 'orders-history',
    loadChildren: () => import('./pages/orders-history/orders-history.module').then((m) => m.OrdersHistoryPageModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then((m) => m.OrderPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
