import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/menu', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'checkout-success',
    loadChildren: () => import('./pages/checkout-success/checkout-success.module').then((m) => m.CheckoutSuccessPageModule),
  },
  {
    path: 'menu-item',
    loadChildren: () => import('./pages/menu-item/menu-item.module').then((m) => m.MenuItemPageModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then((m) => m.OrderPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/tabs/menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
