import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-month-layout',
  templateUrl: './month-layout.component.html',
  styleUrls: ['./month-layout.component.scss']
})
export class MonthLayoutComponent implements OnInit {

  private navigation: number;
  public staticWeekDays: string[];
  private locales: string;
  public calendar: any [];

  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.initialFunc();
  }

  private initialFunc(): void {
    this.locales = 'ru-RU';
    this.navigation = 0;
    this.staticWeekDays = this.calendarService.staticWeekDays;
    this.generateCalendar();
  }

  public changeMonth(step: number): void {
    this.navigation = this.navigation + step;
    this.generateCalendar();
    // this.sortPrepareDate = this.prepareDataToWeekLayout();
  }


  generateCalendar() {
    const date: Date = new Date();
    const day: number = date.getDate();

    if ( this.navigation !== 0 ) {
      date.setMonth( new Date().getMonth() + this.navigation );

      // if ( this.navigation < 0 ) {
      //   this.currenDay = this._daysInCurrentMonth.value;
      // } else if ( this.navigation > 0 ) {
      //   this.currenDay = 1;
      // } else {
      //   this.currenDay = date;
      // }

    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    // this.monthToLocaleDateString( date );
    // this.yearToLocaleDateString( date );

    const daysInCurrentMonth = new Date( year, month + 1, 0 ).getDate();
    // this.daysInCurrentMonth = daysInCurrentMonth;
    const firstDayInCurrentMonth = new Date( year, month, 1 );
    const dateToString = firstDayInCurrentMonth.toLocaleDateString( this.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    } );
    const paddingDaysInCurrentMonth = this.staticWeekDays.indexOf( dateToString.split( ', ' )[0] );
    let calendar: any[] = [];
    const sumAllDays = Number(paddingDaysInCurrentMonth) + Number(daysInCurrentMonth);

    for (let index = 0; index <= sumAllDays; index++) {
      
      if( index > paddingDaysInCurrentMonth) {
        calendar.push({
          padding: false,
          current: (index - paddingDaysInCurrentMonth) === day,
          active: false,
          value: index - Number( paddingDaysInCurrentMonth ),
          date: {
            day: index - Number( paddingDaysInCurrentMonth ),
            dayInWeek: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'long'
            } ),
            dayInWeekShort: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'short'
            } ),
            month: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) ).getMonth(),
            dateLong: new Date( year, month, index - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            } )
          },
          events:[]
        })
      } else {
        calendar.push({
          padding: true,
          current: false,
          active: false,
          value: null,
          date: {
            day: null,
            dayInWeek: new Date( year, month, index - paddingDaysInCurrentMonth ),
            dayInWeekShort: new Date( year, month, index - paddingDaysInCurrentMonth ).toLocaleDateString( this.locales, {
              weekday: 'short'
            } ),
            month: new Date( year, month, index - paddingDaysInCurrentMonth ).getMonth(),
            dateLong: new Date( year, month, index - paddingDaysInCurrentMonth ).toLocaleDateString( this.locales, {
              weekday: 'short',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            } )
          },
          events: []
        })  
      }
      
    }
    this.calendar = calendar;
    
  }

}
