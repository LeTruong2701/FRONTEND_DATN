import { Routes } from '@angular/router';
import { IndexComponent } from './homes/index/index.component';
import { ModulesComponent } from './modules.component';
export const modulesRoutes: Routes = [
  {
    path: '', component: ModulesComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'homes', loadChildren: () => import('./homes/homes.module').then(m => m.HomesModule)},
      { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
   
    ],
    
  }
];
