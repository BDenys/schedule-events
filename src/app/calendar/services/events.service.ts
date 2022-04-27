import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _toggleModalStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get toggleModalStatus(): Observable<boolean> {
    return this._toggleModalStatus.asObservable();
  }

  set toggleModalStatus(value:any) {
    this._toggleModalStatus.next(value);
  }

  private _url = 'https://schedule-events-app-default-rtdb.europe-west1.firebasedatabase.app/events'

  get url() {
    return this._url;
  }

  constructor(private  http: HttpClient) { }

  create(event: any, path: any): Observable<any> {
   const dateShort = event.date.dateShort
                            .replace('.', '-')
                            .replace('.', '-');

   return this.http.post<any>(`${this.url}/${path}/${dateShort}.json`, event)
      .pipe(
        map(res => {
          // console.log(res);
          return res
        })
    )
  }

  load(path: string) {
    // console.log('from service',path);
    return this.http.get<any>(`http://localhost:5000/api/v1/month`)
      .pipe(
        map(events => {
          console.log(events);
         return events
        })
      )
  }

  delete() {

  }

  edit() {

  }
}


