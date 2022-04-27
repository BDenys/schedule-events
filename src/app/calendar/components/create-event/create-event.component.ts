import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  _form!: FormGroup;
  result: string = '';

  public durationStatic = [
    { value: 30, title: '30min' },
    { value: 45, title: '45min' },
    { value: 60, title: '1h' },
    { value: 75, title: '1h15min' },
    { value: 90, title: '1h30min' },
    { value: 105, title: '1h45min' },
    { value: 120, title: '2h' },
    { value: 135, title: '2h15min' },
    { value: 150, title: '2h30min' },
    { value: 165, title: '2h45min' },
    { value: 180, title: '3h' } ];

  public hours = Array( 24 )
    .fill( '' )
    .map( (_, index) => ({
      value: index,
      title: index
    }) );

  public minutes = Array( 60 )
    .fill( '' )
    .map( (_, index) => ({
      value: index,
      title: index
    }) );

  public date = new Date();
  public currentHour = this.date.getHours();
  public currentMinutes = this.date.getMinutes();

  // public _startHour: number = this.currentHour;
  // public _startMinutes: number = this.currentMinutes;
  // public duration: number = 30;

  constructor(private formBuilder: FormBuilder, private  eventsService: EventsService) {}

  get form () {
    return this._form;
  }

  set form (value: FormGroup) {
    this._form = value;
  }

  get startHour() {
    return this._form.get('startHour')?.value;
  }

  set startHour(value: number) {
    this.form.get('startHour')?.setValue(value);
  }

  get startMinutes() {
    return this._form.get('startMinutes')?.value;
  }

  set startMinutes(value: number) {
    this.form.get('startMinutes')?.setValue(value);
  }

  get duration() {
    return this._form.get('duration')?.value;
  }

  set duration(value: number) {
    this.form.get('duration')?.setValue(value);
  }

  ngOnInit(): void {
    this.initFunc();
  }

  initFunc() {
    this.form = this.formBuilder.group( {
      startHour: [ this.currentHour ],
      startMinutes: [ this.currentMinutes ],
      duration: 30
    });

    this.result = this.calculateFinalResult(this.startHour, this.startMinutes, this.duration);

    this.form.valueChanges.subscribe(changedForm => {
      const  { startHour, startMinutes, duration  } = changedForm;
      this.result = this.calculateFinalResult(startHour,startMinutes,duration );
    })
  }
  calculateFinalResult = ( startHour: number, startMinutes: number, duration: number ): string => {
    let hour: number = Number( startHour );
    let minutes: number = Number( startMinutes );
    const convertToHour = duration / 60;

    if ( convertToHour <= 1 || convertToHour < 2 || convertToHour < 3) {
      const minutesLikeMinutes = Number( convertToHour ) * 60;
      minutes = Number( startMinutes ) + minutesLikeMinutes;

      if ( minutes >= 60 ) {
        hour = hour + 1;
        minutes =  minutes - 60 ;

        if( minutes >= 60 ) {
          hour = hour + 1;
          minutes = minutes - 60;

          if (minutes >= 60 ) {
            hour = hour + 1;
            minutes = minutes - 60;
          }

        }

      }

    } else {

      let minutesLikeHours;
      let hourLikeHour;

      if ( !Number.isInteger( +convertToHour ) ) {
        hourLikeHour = String( convertToHour ).split( '.' )[ 0 ];
        minutesLikeHours = String( convertToHour ).split( '.' )[ 1 ];

        if ( Number( minutesLikeHours ) === 5 ) {
          minutesLikeHours = Number( minutesLikeHours ) * 10;
        }

        const minutesLikeMinutes = ( Number( minutesLikeHours ) / 100 ) * 60;
        minutes = startMinutes + minutesLikeMinutes;
        hour = hour + Number( hourLikeHour );

        if ( minutes >= 60 ) {
          hour = hour + 1;
          minutes = minutes - 60;
        }

      } else {
        hourLikeHour = String( convertToHour ).split( '.' )[ 0 ];
        hour = hour + Number( hourLikeHour );
        minutes = startMinutes;
      }
    }

    return `${ hour < 10 ? ` 0${ hour }` : hour }:${ minutes < 10 ? `0${ minutes }` : minutes }`
    // setFinishEvent(`${ hour < 10 ? ` 0${ hour }` : hour }:${ minutes < 10 ? `0${ minutes }` : minutes }`)

    // return `${ NormalizeTitle(hour) }:${ NormalizeTitle(minutes) }`;
  };

  closeModal() {
    this.eventsService.toggleModalStatus = false;
  }

  submitHandler() {

  }
}
