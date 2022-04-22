import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-week-layout',
  templateUrl: './week-layout.component.html',
  styleUrls: ['./week-layout.component.scss']
})
export class WeekLayoutComponent implements OnInit {

  public rows: number[];
  public columns: number[];
  public staticTime: number[];
  public staticWeekDayDisplay: string[];

  constructor(
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.initialFunc();
  }

  private initialFunc(): void {
    this.rows = Array( 7 ).fill( '' ).map( (_: string, index: number): number => index );
    this.columns = Array( 15 ).fill( '' ).map( (_: string, index: number): number => index );
    
    this.staticTime = this.calendarService.staticTime;
    this.staticWeekDayDisplay = this.calendarService.staticWeekDayDisplay;
  }

  public changeWeekIndex(step: number):void {

  }

}
