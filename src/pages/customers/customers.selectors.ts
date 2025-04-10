import { createSelector } from '@ngrx/store';
import { Customer } from './customers.model';

export interface CustomersState {
  customers: Customer[];
}
export const selectFeature = (state: CustomersState) => state;
export const selectFeatureCustomers = createSelector(
  selectFeature,
  (state: CustomersState) => state.customers
);
