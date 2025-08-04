import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { Appointment } from '../../models/appointment';
import * as AppointmentActions from './appointment.actions';

@Injectable()
export class AppointmentEffects {

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.loadAppointments),
      map(() => {
        const appointments = this.getAppointmentsFromStorage();
        return AppointmentActions.loadAppointmentsSuccess({ appointments });
      })
    )
  );

  saveAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppointmentActions.addAppointment,
        AppointmentActions.deleteAppointment,
        AppointmentActions.loadAppointmentsSuccess
      ),
      tap((action) => {
        if (action.type === AppointmentActions.addAppointment.type) {
          const appointments = this.getAppointmentsFromStorage();
          const updatedAppointments = [...appointments, action.appointment];
          this.saveAppointmentsToStorage(updatedAppointments);
        } else if (action.type === AppointmentActions.deleteAppointment.type) {
          const appointments = this.getAppointmentsFromStorage();
          const updatedAppointments = appointments.filter(a => a.id !== action.id);
          this.saveAppointmentsToStorage(updatedAppointments);
        } else if (action.type === AppointmentActions.loadAppointmentsSuccess.type) {
          this.saveAppointmentsToStorage(action.appointments);
        }
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}

  private getAppointmentsFromStorage(): Appointment[] {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  private saveAppointmentsToStorage(appointments: Appointment[]): void {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
}