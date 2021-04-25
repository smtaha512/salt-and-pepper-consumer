import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '/',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
