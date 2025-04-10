import { createAction, props } from '@ngrx/store';

export const addCustomer = createAction(
  '[Customers] Add Customer',
  props<{ id: string; name: string; email: string; image_url: string }>()
);
export const updateCustomer = createAction(
  '[Customers] Update Customer',
  props<{ id: string; name: string; email: string; image_url: string }>()
);
export const deleteCustomer = createAction(
  '[Customers] Delete Customer',
  props<{ id: string }>()
);
