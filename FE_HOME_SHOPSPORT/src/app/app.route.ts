import { Routes } from '@angular/router';

export const AppRoute: Routes = [
  { path: '', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},

  
  { path: '**', redirectTo:'not-found', pathMatch:'full'},  
];