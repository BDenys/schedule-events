import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-day-layout',
  templateUrl: './day-layout.component.html',
  styleUrls: ['./day-layout.component.scss']
})
export class DayLayoutComponent implements OnInit {
  public staticTime: number[] = [];
  public columns: number[];

  constructor(
    private calendarService: CalendarService
  ) { 
    this.columns = Array( 15 ).fill( '' ).map( (_: string, index: number): number => index );
  }

  ngOnInit(): void {
    this.staticTime = this.calendarService.staticTime;
  }

  public changeDay(step: number): void {

  }

}
