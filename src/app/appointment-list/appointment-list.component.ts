import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import * as AppointmentActions from '../store/appointment/appointment.actions';
import { selectAppointments, selectAppointmentsLoading, selectAppointmentsError } from '../store/appointment/appointment.selectors';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle : string = "";
  newAppointmentDate : Date = new Date();

  appointments$: Observable<Appointment[]>;

  constructor(private store: Store) {
    this.appointments$ = this.store.select(selectAppointments);
  }

  ngOnInit(): void {
    this.store.dispatch(AppointmentActions.loadAppointments());
  }

  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      this.store.dispatch(AppointmentActions.addAppointment({ appointment: newAppointment }))
    }
  }

  deleteAppointment(appointment: Appointment){
    this.store.dispatch(AppointmentActions.deleteAppointment({ id: appointment.id }));
  }
}
