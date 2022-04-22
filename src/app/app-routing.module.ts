import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarModule)},
  {path: '', redirectTo: '/calendar/day', pathMatch: 'full'},
  {path: '**', data: {title: 'not-found'}, component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
