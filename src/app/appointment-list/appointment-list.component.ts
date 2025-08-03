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

  appointments: Appointment[] = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? [...JSON.parse(savedAppointments)] : []
    
    // Sync localStorage data to NgRx store
    this.store.dispatch(AppointmentActions.loadAppointmentsSuccess({ appointments: this.appointments }));
  }

  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.appointments = [...this.appointments, newAppointment]

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments))
      
      // Update NgRx store
      this.store.dispatch(AppointmentActions.addAppointment({ appointment: newAppointment }))
    }
  }

  deleteAppointment(index: number){
    const appointmentToDelete = this.appointments[index];
    this.appointments.splice(index, 1)
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
    
    // Update NgRx store
    this.store.dispatch(AppointmentActions.deleteAppointment({ id: appointmentToDelete.id }));
  }
}
