import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoices.actions';
import { Invoice } from '../../types/types';

export const intitialState: Invoice[] = [
  {
    id: 'd6e15627-9fe1-4961-8c5b-ea44a9bd81aa',
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 5795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: '3958dc3e-712f-4377-85e9-fec4b6a6442a',
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    amount: 2348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    id: '3958dc9e-142f-4377-85e9-fec4b6a6442a',
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    id: '76d25c26-f784-44a2-kc19-586678f7c2f2',
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 4800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    id: 'CC24C14A-0ACF-4F4A-A6C1-D45682C144B9',
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 4577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    id: '76d25c26-f784-44a2-kc19-586678fxc2b2',
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 5246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    id: '13D07535-C52E-4157-A011-F1D2EF4E8CBB',
    customer_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    amount: 2666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    id: '13E07535-C59E-4157-A911-F8D2EF4E0CBB',
    customer_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    amount: 3545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    id: '13D47930-G59E-9154-A011-F8D2EX4E0CBB',
    customer_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    id: '13D07536-C59E-4157-A061-F8D2EF4E0CBB',
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    id: '13T07535-H59E-4157-A011-F8D2EF4E0CBB',
    customer_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    amount: 4500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    id: '13T07535-H29E-7357-A011-F8D2EF4E0MMB',
    customer_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    id: '13T07839-BH59E-4157-A011-F8D2EF4E0CGG',
    customer_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

export const invoiceReducer = createReducer(
  intitialState,
  on(
    InvoiceActions.addInvoice,
    (state, { id, customer_id, date, amount, status }) => {
      return [
        ...state,
        {
          id,
          customer_id,
          date,
          amount,
          status,
        },
      ];
    }
  ),
  on(
    InvoiceActions.updateInvoice,
    (state, { id, customer_id, date, amount, status }) => {
      const invoiceIndex = state.findIndex((invoice) => invoice.id === id);
      if (invoiceIndex === -1) {
        return state;
      }
      const updatedInvoices = [...state];
      updatedInvoices[invoiceIndex] = {
        id,
        customer_id,
        date,
        amount,
        status,
      };
      return updatedInvoices;
    }
  ),
  on(InvoiceActions.deleteInvoice, (state, { id }) => {
    const invoiceIndex = state.findIndex((invoice) => invoice.id === id);
    if (invoiceIndex === -1) {
      return state;
    }
    const updatedInvoices = [...state];
    updatedInvoices.splice(invoiceIndex, 1);
    return updatedInvoices;
  })
);
