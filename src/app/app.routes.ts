import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { RevenueComponent } from '../pages/revenue/revenue.component';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';
import { provideState } from '@ngrx/store';
import { customersReducer } from '../pages/customers/customers.reducer';
import { invoiceReducer } from '../pages/invoices/invoices.reducer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    providers: [provideState({ name: 'customers', reducer: customersReducer })],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    providers: [provideState({ name: 'customers', reducer: customersReducer })],
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    providers: [
      provideState({ name: 'invoices', reducer: invoiceReducer }),
      provideState({ name: 'customers', reducer: customersReducer }),
    ],
  },
  {
    path: 'revenue',
    component: RevenueComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
