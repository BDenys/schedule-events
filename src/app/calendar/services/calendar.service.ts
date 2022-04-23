import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {  
  public staticWeekDays: string[] = [ 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота','воскресенье' ];
  public staticWeekDaysDisplay: string[] = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

  public staticTime = Array(15).fill('').map((_: string, index: number): number => {
    const defaultPoint = 7;
    return defaultPoint + index;
  })

  constructor() { }

}
