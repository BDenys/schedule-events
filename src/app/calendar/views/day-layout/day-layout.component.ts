import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { EventsService } from '../../services/events.service';

@UntilDestroy()
@Component({
  selector: 'app-day-layout',
  templateUrl: './day-layout.component.html',
  styleUrls: ['./day-layout.component.scss']
})
export class DayLayoutComponent implements OnInit {

  public hours = Array(24)
    .fill('')
    .map( ( _, index ) => ({ value:  index, title:  index, }));

  public minutes = Array(60)
    .fill('')
    .map( ( _, index ) => ({ value:  index, title:  index, }));

  public staticTime: number[] = [];
  public columns: number[];
  public currentDay: number;
  public daysInCurrentMonth: number;
  public currentMonth: string;
  public currentYear: string;
  public calendar: any[];
  private path: string;
  public isModalOpen: boolean = true;
  public calendarForWeeks: any[];
  public indexInWeek: number;

  private _toggleModalStatus: Observable<boolean>;

  get toggleModalStatus():  Observable<boolean> {
    return this._toggleModalStatus;
  }

  set toggleModalStatus(value: Observable<boolean>) {
    this._toggleModalStatus = value;
  }
  private readonly _date: Date;
  get date(): Date {
    return this._date;
  }

  public _currentHour: number;
  get currentHour(): number {
    return this._currentHour;
  }
  set currentHour(value: number) {
     this._currentHour = this.date.getHours();
  }

  public _currentMinutes: number;
  get currentMinutes(): number {
    return this._currentMinutes;
  }
  set currentMinutes(value: number) {
     this._currentMinutes = this.date.getMinutes();
  }

  public startHour: any = this.currentHour;
  public startMinutes: any = this.currentMinutes;
  public endTime: any;
  public duration: any;
  public title: any;
  public description: any;

  constructor(
    private calendarService: CalendarService,
    private eventsService: EventsService,
  ) {
  }

  ngOnInit(): void {
    this.initialFunc();
  }

  private initialFunc(): void {

    this.toggleModalStatus = this.eventsService.toggleModalStatus;

    this.columns = Array( 15 ).fill( '' ).map( (_: string, index: number): number => index );

    this.staticTime = this.calendarService.staticTime;

    this.calendarService.currentDay$
      .pipe( untilDestroyed( this ) )
      .subscribe( (currentDay: number) => {
        this.currentDay = currentDay;
      } );

    this.calendarService.calendar$
      .pipe( untilDestroyed( this ) )
      .subscribe( (calendarForWeeks) => {
        this.calendar = this.calendarService.sortCalendar(calendarForWeeks);
        const date = this.calendar[this.currentDay - 1].date.dateShort.split('.');
        this.path = `${date[1]}-${date[2]}`;
      } );

    this.calendarService.daysInCurrentMonth$
      .pipe( untilDestroyed( this ) )
      .subscribe( (days: number) => {
        this.daysInCurrentMonth = days;
      } );

    this.calendarService.indexCurrentWeek$
      .pipe( untilDestroyed( this ) )
      .subscribe( (indexCurrentWeek: number) => {
        this.indexInWeek = indexCurrentWeek;
      } );

    this.calendarService.currentMonthString$
      .pipe( untilDestroyed( this ) )
      .subscribe( (month: string) => {
        this.currentMonth = month;
      } );

    this.calendarService.currentYearString$
      .pipe( untilDestroyed( this ) )
      .subscribe( (year: string) => {
        this.currentYear = year;
      } );

  }

  changeDay(step: number): void {
    const firstDayInMonth = 1;
    if ( firstDayInMonth === this.currentDay && step < 0 ) {
      this.calendarService.currentDay$ = this.daysInCurrentMonth;
      this.calendarService.changeMonth( step );

    } else if ( this.currentDay >= this.daysInCurrentMonth && step > 0 ) {
      this.calendarService.currentDay$ = firstDayInMonth;
      this.calendarService.changeMonth( step );

    } else {
      this.calendarService.currentDay$ = this.currentDay + step;
    }
  }

  replacePath(path: string) {
    return path
            .replace('.', '-')
            .replace('.', '-')
  }

  createEvent() {
    this.toggleModalFunc();
    // const day = this.calendar[this.currentDay - 1].date.day;
    // const month = this.calendar[this.currentDay - 1].date.dateShort.split('.');
    // const path =`${month[1]}-${month[2]}`;
    //
    // const newEvent = {
    //   startTime: '9:00',
    //   endTime: '10:00',
    //   duration: 60,
    //   title: `New Event: ${day}`,
    //   description: 'Test Description',
    //   date: {
    //     day,
    //     dateShort: this.calendar[this.currentDay - 1].date.dateShort
    //   },
    // }
    // this.eventsService.create(newEvent, path)
    //   .subscribe(response => {
    //   // console.log('from day layout',response);
    // });
  }

  binarySearch(arr: any [], day: number, indexCurrentWeek: number): any {
    let start1DArray = 0;
    let end1DArray = arr[indexCurrentWeek].length;
    let middle;
    let found = false;
    let position = -1;

    while ( !found  && start1DArray <= end1DArray ) {
      middle = Math.floor( start1DArray + end1DArray ) / 2;

      if ( arr[middle] === day ) {
        // if we find element we will return his position
        found = true;
        position = middle;
        return position;
      }

      if ( day < arr[middle] ) {
        end1DArray = middle - 1; // move - 1 position our element what we want to find
      } else {
        start1DArray = middle + 1; // move + 1 position our element what we want to find
      }

    }

    return position;
  }

  toggleModalFunc() {
   this.eventsService.toggleModalStatus = false;
  }


}
