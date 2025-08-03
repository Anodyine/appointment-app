import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from './appointment.reducer';

export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointments');

export const selectAppointments = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.appointments
);

export const selectAppointmentsLoading = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.loading
);

export const selectAppointmentsError = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.error
);