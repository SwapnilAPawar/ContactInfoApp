import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { AppPreloadStrategy } from './app-preload-strategy';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Define the paths to the lazily loaded modules
const lazyPaths = {
  contact: './contact/contact.module#ContactModule'
};
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'contact' },
  {
    path: 'contact',
    loadChildren: lazyPaths.contact,
    data: { preload: true }
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AppPreloadStrategy
    })
  ],
  exports: [RouterModule],
  providers: [AppPreloadStrategy]
})
export class AppRouteModule {}
