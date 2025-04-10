import { createSelector } from '@ngrx/store';
import { Invoice } from '../../types/types';

export interface InvoiceState {
  invoices: Invoice[];
}
export const selectFeature = (state: InvoiceState) => state;
export const selectFeatureInvoices = createSelector(
  selectFeature,
  (state: InvoiceState) => state.invoices
);
