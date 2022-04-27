import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { EventsService } from '../../services/events.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-calendar-main-layout',
  templateUrl: './calendar-main-layout.component.html',
  styleUrls: ['./calendar-main-layout.component.scss']
})
export class CalendarMainLayoutComponent implements OnInit {

  private _toggleModalStatus: Observable<boolean>;

  get toggleModalStatus():  Observable<boolean> {
    return this._toggleModalStatus;
  }

  set toggleModalStatus(value: Observable<boolean>) {
    this._toggleModalStatus = value;
  }

  public currentMonth$: Observable<string> ;
  public defaultCurrentDay$: Observable<number>;

  constructor(
    private calendarService: CalendarService,
    private  eventsService: EventsService
    ) { }

  ngOnInit(): void {
   this.initFunc();
  }

  initFunc() {
    this.calendarService.generateCalendar();
    this.currentMonth$ = this.calendarService.currentMonthString$;
    this.defaultCurrentDay$ = this.calendarService.currentDay$
    this.toggleModalStatus =  this.eventsService.toggleModalStatus;
  }

  toggleModal() {
    this.eventsService.toggleModalStatus = true;
  }

  public changeMonth(step: number): void {
    this.calendarService.changeMonth(step);
    // this.sortPrepareDate = this.prepareDataToWeekLayout();
  }

}
