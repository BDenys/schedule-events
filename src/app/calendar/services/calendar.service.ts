import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class CalendarService {

  public testEvents = [
    [ { date: {
      day: 1
      },events: [] }, { date: {
        day: 2
      },events: [] }, { date: {
        day: 3
      },events: [] }, { date: {
        day: 4
      },events: [] }, { date: {
        day: 5
      },events: [] }, { date: {
        day: 6
      },events: [] }, { date: {
        day: 7
      },events: [] } ],
    [ { date: {
      day: 8
      },events: [] }, { date: {
        day: 9
      },events: [] }, { date: {
        day: 10
      },events: [] }, { date: {
        day: 11
      },events: [] }, { date: {
        day: 12
      },events: [] }, { date: {
        day: 13
      },events: [] }, { date: {
        day: 14
      },events: [] } ],
    [ { date: {
      day: 15
      },events: [] }, { date: {
        day: 16
      },events: [] }, { date: {
        day: 17
      },events: [] }, { date: {
        day: 18
      },events: [] }, { date: {
        day: 19
      },events: [] }, { date: {
        day: 20
      },events: [] }, { date: {
        day: 21
      },events: [] } ],
    [ { date: {
      day: 22
      },events: [] }, { date: {
        day: 23
      },events: [] }, { date: {
        day: 24
      },events: [] }, { date: {
        day: 25
      },events: [] }, { date: {
        day: 26
      },events: [] }, { date: {
        day: 27
      },events: [] }, { date: {
        day: 28
      },events: [] } ],
    [ { date: {
      day: 29
      },events: [] }, { date: {
        day: 30
      },events: [] }, { date: {
        day: 31
      },events: [] } ]
  ];

  currentDay = new Date().getDate();

  public staticWeekDays: string[] = [ 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье' ];
  public staticWeekDaysDisplay: string[] = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ];

  public staticTime = Array( 15 ).fill( '' ).map( (_: string, index: number): number => {
    const defaultPoint = 7;
    return defaultPoint + index;
  } );

  public locales = 'ru-RU';
  public navigation = 0;

  private day: number;

  private _currentDay$: BehaviorSubject<number> = new BehaviorSubject<number>( new Date().getDate() );

  get currentDay$(): Observable<number> {
    return this._currentDay$.asObservable();
  }

  set currentDay$(value: any) {
    this._currentDay$.next( value );
  }

  private _daysInCurrentMonth$: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );

  get daysInCurrentMonth$(): Observable<number> {
    return this._daysInCurrentMonth$.asObservable();
  }

  set daysInCurrentMonth$(value: any) {
    this._daysInCurrentMonth$.next( value );
  }

  public _currentMonthString$: BehaviorSubject<string> = new BehaviorSubject<string>( '' );

  get currentMonthString$(): Observable<string> {
    return this._currentMonthString$.asObservable();
  }

  set currentMonthString$(value: any) {
    this._currentMonthString$.next( value );
  }

  public _currentYearString$: BehaviorSubject<string> = new BehaviorSubject<string>( '' );

  get currentYearString$(): Observable<string> {
    return this._currentYearString$.asObservable();
  }

  set currentYearString$(value: any) {
    this._currentYearString$.next( value );
  }

  private _calendar$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>( [] );

  get calendar$(): Observable<any[]> {
    return this._calendar$.asObservable();
  }

  set calendar$(data: any) {
    this._calendar$.next( data );
  }

  private _calendarForWeeks$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>( [] );

  get calendarForWeeks$(): Observable<any[]> {
    return this._calendarForWeeks$.asObservable();
  }

  set calendarForWeeks$(data: any) {
    this._calendarForWeeks$.next( data );
  }

  private _generatedDaysForWeek$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>( [] );

  get generatedDaysForWeek$(): Observable<any[]> {
    return this._generatedDaysForWeek$.asObservable();
  }

  set generatedDaysForWeek$(data: any) {
    this._generatedDaysForWeek$.next( data );
  }

  private _stringWeekDaysArray$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>( [] );

  get stringWeekDaysArray$(): Observable<any[]> {
    return this._stringWeekDaysArray$.asObservable();
  }

  set stringWeekDaysArray$(data: any) {
    this._stringWeekDaysArray$.next( data );
  }

  private _indexCurrentWeek$: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );

  get indexCurrentWeek$(): Observable<number> {
    return this._indexCurrentWeek$.asObservable();
  }

  set indexCurrentWeek$(data: any) {
    this._indexCurrentWeek$.next( data );
  }

  constructor() {
  }

  public generateCalendar() {
    const date: Date = new Date();
    let day: number = date.getDate();
    let year: number = date.getFullYear();
    let month: number = date.getMonth();
    let daysInCurrentMonth;

    if ( this.navigation !== 0 ) {
      date.setMonth( new Date().getMonth() + this.navigation );
      const year: number = date.getFullYear();
      const month: number = date.getMonth();
      daysInCurrentMonth = new Date( year, month + 1, 0 ).getDate();
      this.daysInCurrentMonth$ = daysInCurrentMonth;

      if ( this.navigation < 0 ) {
        this.currentDay$ = this._daysInCurrentMonth$.value;
      } else if ( this.navigation > 0 ) {
        this.currentDay$ = 1;
      } else {
        this.currentDay$ = date;
      }

    } else {
      daysInCurrentMonth = new Date( year, month + 1, 0 ).getDate();
      this.daysInCurrentMonth$ = daysInCurrentMonth;
    }

    this.monthToLocaleDateString( date );
    this.yearToLocaleDateString( date );

    const firstDayInCurrentMonth = new Date( year, month, 1 );
    const dateToString = firstDayInCurrentMonth.toLocaleDateString( this.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    } );

    const paddingDaysInCurrentMonth = this.staticWeekDays.indexOf( dateToString.split( ', ' )[0] );
    let calendar: any[] = [];
    const sumAllDays = Number( paddingDaysInCurrentMonth ) + Number( daysInCurrentMonth );

    for ( let index = 1; index <= sumAllDays; index++ ) {

      if ( index > paddingDaysInCurrentMonth ) {
        calendar.push( {
          padding: false,
          current: (index - paddingDaysInCurrentMonth) === day,
          active: false,
          value: index - Number( paddingDaysInCurrentMonth ),
          date: {
            day: index - Number( paddingDaysInCurrentMonth ),
            // dayInWeek: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
            //   .toLocaleDateString( this.locales, {
            //     weekday: 'long'
            //   } ),
            // dayInWeekShort: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
            //   .toLocaleDateString( this.locales, {
            //     weekday: 'short'
            //   } ),
            // month: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
            //   .toLocaleDateString( this.locales, { month: 'numeric' } ),
            dateShort: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales ),
            // dateLong: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
            //   .toLocaleDateString( this.locales, {
            //     weekday: 'long',
            //     year: 'numeric',
            //     month: 'numeric',
            //     day: 'numeric'
            //   } )
          },
          events: []
        } );
      } else {
        calendar.push( {
          padding: true,
          current: false,
          active: false,
          value: null,
          date: {
            day: index - Number( paddingDaysInCurrentMonth ),
            dayInWeek: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales, {
                weekday: 'long'
              } ),
            dayInWeekShort: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales, {
                weekday: 'short'
              } ),
            month: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales ),
            dateShort: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales ),
            dateLong: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) )
              .toLocaleDateString( this.locales, {
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              } )
          },
          events: []
        } );
      }

    }

    this.calendar$ = calendar;
    this.generatedDaysForWeek$ = this.generateDaysOfWeek( this.sortCalendar( calendar ) );
    this.calendarForWeeks$ = this.prepareCalendarToWeekLayout( this.sortCalendar( calendar ) );
    this.stringWeekDaysArray$ = this.generateStringWeekDaysArray( this._calendarForWeeks$.value );

  }

  public changeMonth(step: number): void {
    this.navigation = this.navigation + step;
    this.generateCalendar();
    this.indexCurrentWeek$ = 0;
  }

  changeCurrentWeek(step: number) {
    if ( this._indexCurrentWeek$.value <= 0 && step < 0 ) {
      this.indexCurrentWeek$ = (this._stringWeekDaysArray$.value.length - 1);
      this.changeMonth( step );

    } else if ( this._indexCurrentWeek$.value >= (this._stringWeekDaysArray$.value.length - 1) && step > 0 ) {
      this.indexCurrentWeek$ = 0;
      this.changeMonth( step );

    } else {
      this.indexCurrentWeek$ = this._indexCurrentWeek$.value + step;
    }
  }

  monthToLocaleDateString(date: Date): void {
    this.currentMonthString$ = date.toLocaleDateString( this.locales, { month: 'long' } );
  }

  yearToLocaleDateString(date: Date): void {
    this.currentYearString$ = date.toLocaleDateString( this.locales, { year: 'numeric' } );
  }

  prepareCalendarToWeekLayout(calendar: any[]): any[][] {
    const SIZE = 7;
    return calendar.reduce( (acc: any[][], currenElement: any) => {
      if ( acc[acc.length - 1].length == SIZE ) {
        acc.push( [] );
      }

      if ( !currenElement.padding ) {
        acc[acc.length - 1].push( currenElement );
      }
      return acc;
    }, [ [] ] );
  }

  sortCalendar(calendar: any[]) {
    return calendar.filter( day => !day.padding ).sort( (dayA, dayB) => {
      return +dayA.date.day - +dayB.date.day;
    } );
  }

  generateDaysOfWeek(calendar: any[]) {
    const arraySize = 7;
    return calendar.reduce( (acc, currenElement) => {
      if ( acc[acc.length - 1].length == arraySize ) {
        acc.push( [] );
      }

      if ( !currenElement.padding ) {
        acc[acc.length - 1].push( currenElement.date.day );
      }

      return acc;
    }, [ [] ] );
  }

  generateStringWeekDaysArray(calendar: any[][]): any[] {
    const arr: any[] = [];
    for ( let i = 0; i < calendar.length; i++ ) {
      if ( i == 0 ) {
        arr.push( `0${ calendar[0][0].date.day } - 0${ calendar[0][6].date.day }` );

      } else if ( i == 1 ) {
        arr.push( `0${ calendar[1][0].date.day } - ${ calendar[1][6].date.day }` );

      } else if ( i == 2 ) {
        arr.push( `${ calendar[2][0].date.day } - ${ calendar[2][6].date.day }` );

      } else if ( i == 3 ) {
        arr.push( `${ calendar[3][0].date.day } - ${ calendar[3][6].date.day }` );

      } else if ( i == 4 ) {

        if ( calendar[4][calendar[4].length - 1].date.day > 28 ) {
          arr.push( `${ calendar[4][0].date.day } - ${ calendar[4][calendar[4].length - 1].date.day }` );
        } else {
          arr.push( `${ calendar[4][0].date.day }` );
        }
      }
    }
    return arr;
  }

  findIndexCurrentWeek(calendar: any[]): void {

    if ( calendar[0][0].date.day <= this.currentDay && this.currentDay <= calendar[0][6].date.day ) {
      this.indexCurrentWeek$ = 0;

    } else if ( calendar[1][0].date.day <= this.currentDay && this.currentDay <= calendar[1][6].date.day ) {
      this.indexCurrentWeek$ = 1;

    } else if ( calendar[2][0].date.day <= this.currentDay && this.currentDay <= calendar[2][6].date.day ) {
      this.indexCurrentWeek$ = 2;

    } else if ( calendar[3][0].date.day <= this.currentDay && this.currentDay <= calendar[3][6].date.day ) {
      this.indexCurrentWeek$ = 3;

    } else if ( calendar[4][0].date.day <= this.currentDay ) {
      this.indexCurrentWeek$ = 4;
    }

  }

}
