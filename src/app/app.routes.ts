import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { RevenueComponent } from '../pages/revenue/revenue.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'revenue',
    component: RevenueComponent,
  },
];
