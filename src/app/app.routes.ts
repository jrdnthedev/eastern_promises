import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { RevenueComponent } from '../pages/revenue/revenue.component';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
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
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
