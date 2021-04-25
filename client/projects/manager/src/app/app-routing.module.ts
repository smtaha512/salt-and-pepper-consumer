import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/signin' },
  { path: 'orders', canLoad: [AuthGuard], loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersPageModule) },
  {
    path: 'orders-history',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/orders-history/orders-history.module').then((m) => m.OrdersHistoryPageModule),
  },
  {
    path: 'order',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/order/order.module').then((m) => m.OrderPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
