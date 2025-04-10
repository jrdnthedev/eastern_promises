import { Customer } from '../../types/types';
import * as CustomerActions from './customers.actions';
import { createReducer, on } from '@ngrx/store';

export const intitialState: Customer[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

export const customersReducer = createReducer(
  intitialState,
  on(CustomerActions.addCustomer, (state, { id, name, email, image_url }) => {
    return [
      ...state,
      {
        id,
        name,
        email,
        image_url,
      },
    ];
  }),
  on(
    CustomerActions.updateCustomer,
    (state, { id, name, email, image_url }) => {
      const customerIndex = state.findIndex((customer) => customer.id === id);
      if (customerIndex === -1) {
        return state;
      }
      const updatedCustomers = [...state];
      updatedCustomers[customerIndex] = {
        id,
        name,
        email,
        image_url,
      };
      return updatedCustomers;
    }
  ),
  on(CustomerActions.deleteCustomer, (state, { id }) => {
    return state.filter((customer) => customer.id !== id);
  })
);
