import { createAction, props } from '@ngrx/store';

export const addInvoice = createAction(
  '[Invoices] Add Invoice',
  props<{
    id: string;
    customer_id: string;
    date: string;
    amount: number;
    status: string;
  }>()
);

export const updateInvoice = createAction(
  '[Invoices] Update Invoice',
  props<{
    id: string;
    customer_id: string;
    date: string;
    amount: number;
    status: string;
  }>()
);
export const deleteInvoice = createAction(
  '[Invoices] Delete Invoice',
  props<{ id: string }>()
);

export const deleteAllInvoices = createAction(
  '[Invoices] Delete All Invoices',
  props<{ id: string }>()
);
