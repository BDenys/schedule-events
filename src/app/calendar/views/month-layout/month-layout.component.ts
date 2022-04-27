import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-month-layout',
  templateUrl: './month-layout.component.html',
  styleUrls: ['./month-layout.component.scss']
})
export class MonthLayoutComponent implements OnInit {

  public staticWeekDays: string[];
  public calendar$: Observable <any[]>;

  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.initialFunc();
  }

  private initialFunc(): void {
    this.staticWeekDays = this.calendarService.staticWeekDaysDisplay;
    this.calendarService.generateCalendar();
    this.calendar$ = this.calendarService.calendar$;
  }

  public changeMonth(step: number): void {
    this.calendarService.changeMonth(step);
    // this.sortPrepareDate = this.prepareDataToWeekLayout();
  }

}
