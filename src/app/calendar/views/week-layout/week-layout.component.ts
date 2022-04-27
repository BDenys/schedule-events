import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-week-layout',
  templateUrl: './week-layout.component.html',
  styleUrls: ['./week-layout.component.scss']
})
export class WeekLayoutComponent implements OnInit, OnDestroy {

  public rows: number[];
  public columns: number[];
  public staticTime: number[];
  public staticWeekDaysDisplay: string[];
  public stringWeekArray: string[];
  public indexCurrentWeek: number;
  public calendarForWeeks: any[];
  public weekCalendarDays: any[][];
  private _initValue = 0;

  constructor(
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    const date = new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    console.log(date);
    this.initialFunc();
  }

  private initialFunc(): void {
    this.rows = Array( 7 ).fill( '' ).map( (_: string, index: number): number => index );
    this.columns = Array( 15 ).fill( '' ).map( (_: string, index: number): number => index );

    this.staticTime = this.calendarService.staticTime;
    this.staticWeekDaysDisplay = this.calendarService.staticWeekDaysDisplay;

    this.calendarService.calendarForWeeks$.pipe(untilDestroyed(this))
      .subscribe(calendarForWeeks => {
        console.log(calendarForWeeks);
       this.calendarForWeeks = calendarForWeeks;
       this._initValue++;
       if( this._initValue === 1 ) {
          this.calendarService.findIndexCurrentWeek(this.calendarForWeeks);
        }
      })

    this.calendarService.generatedDaysForWeek$
      .pipe(untilDestroyed(this))
      .subscribe(weekCalendarDays => {
        this.weekCalendarDays = weekCalendarDays;
      })

    this.calendarService.stringWeekDaysArray$
      .pipe(untilDestroyed(this))
      .subscribe(stringWeekArray => {
        this.stringWeekArray = stringWeekArray;
      })

    this.calendarService.indexCurrentWeek$
      .pipe(untilDestroyed(this))
      .subscribe(indexCurrentWeek => {
      this.indexCurrentWeek = indexCurrentWeek;
    })
  }

  public changeWeekIndex(step: number):void {
    this.calendarService.changeCurrentWeek(step);
  }

  ngOnDestroy() {
    this._initValue = 0;
  }

}
