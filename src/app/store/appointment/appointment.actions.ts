import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../models/appointment';

export const loadAppointments = createAction('[Appointment] Load Appointments');

export const loadAppointmentsSuccess = createAction(
  '[Appointment] Load Appointments Success',
  props<{ appointments: Appointment[] }>()
);

export const loadAppointmentsFailure = createAction(
  '[Appointment] Load Appointments Failure',
  props<{ error: string }>()
);

export const addAppointment = createAction(
  '[Appointment] Add Appointment',
  props<{ appointment: Appointment }>()
);

export const deleteAppointment = createAction(
  '[Appointment] Delete Appointment',
  props<{ id: number }>()
);