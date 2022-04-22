import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {  

  public staticTime = Array(15).fill('').map((_: string, index: number): number => {
    const defaultPoint = 7;
    return defaultPoint + index;
  })

  constructor() { }

}
