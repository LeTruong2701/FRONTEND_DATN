import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},
  // { path: 'shop', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
