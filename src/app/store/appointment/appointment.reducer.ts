import { createReducer, on } from '@ngrx/store';
import { Appointment } from '../../models/appointment';
import * as AppointmentActions from './appointment.actions';

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

export const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null
};

export const appointmentReducer = createReducer(
  initialState,
  on(AppointmentActions.loadAppointments, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    appointments,
    loading: false,
    error: null
  })),
  on(AppointmentActions.loadAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AppointmentActions.addAppointment, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments, appointment]
  })),
  on(AppointmentActions.deleteAppointment, (state, { id }) => ({
    ...state,
    appointments: state.appointments.filter(a => a.id !== id)
  }))
);