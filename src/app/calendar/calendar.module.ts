import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CalendarMainLayoutComponent } from './views/calendar-main-layout/calendar-main-layout.component';
import { DayLayoutComponent } from './views/day-layout/day-layout.component';
import { WeekLayoutComponent } from './views/week-layout/week-layout.component';
import { MonthLayoutComponent } from './views/month-layout/month-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CreateEventComponent } from './components/create-event/create-event.component';

const routes: Routes = [
  { path: '', component: CalendarMainLayoutComponent,data: {title: 'calendar'}, children: [
    {path: '', redirectTo: '/calendar/day', pathMatch: 'full'},
    {path: 'day', component: DayLayoutComponent, data: {title: 'day'}},
    {path: 'week', component: WeekLayoutComponent, data: {title: 'week'}},
    {path: 'month', component: MonthLayoutComponent, data: {title: 'month'}}
  ] }
]

@NgModule({
  declarations: [
    CalendarMainLayoutComponent,
    DayLayoutComponent,
    WeekLayoutComponent,
    MonthLayoutComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CalendarModule { }
