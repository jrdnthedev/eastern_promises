import { Component, inject } from '@angular/core';
import { VerticalBarChartComponent } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { catchError, takeUntil } from 'rxjs/operators';
import { Customer, Invoice, Revenue } from '../../types/types';
import { forkJoin, Observable, Subject, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue',
  imports: [VerticalBarChartComponent, CommonModule],
  standalone: true,
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  invoiceData: Revenue[] = [];
  private destroy$ = new Subject<void>();
  private store = inject(Store);

  ngOnInit() {
    this.createRevenueData();
  }
  createRevenueData() {
    const customers$: Observable<Customer[]> = this.store
      .select('customers')
      .pipe(take(1));
    const invoices$: Observable<Invoice[]> = this.store
      .select('invoices')
      .pipe(take(1));
    const mergedList = forkJoin({
      customers: customers$,
      invoices: invoices$,
    });

    mergedList
      .pipe(
        catchError((_, caught) => caught),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        const customers = result.customers;
        const invoices = result.invoices;
        this.invoiceData = this.getRevenueData(customers, invoices);
      });
  }

  getRevenueData(customers: Customer[], invoices: Invoice[]): Revenue[] {
    return customers.map((customer: Customer) => {
      const customerInvoices = invoices.filter(
        (inv) => inv.customer_id === customer.id
      );

      const series = customerInvoices.map((invoice: Invoice) => {
        const date = new Date(invoice.date);
        const year = date.getFullYear().toString().padStart(4, '0');
        return {
          name: year || invoice.id.toString(),
          value: invoice.amount,
          extra: { code: invoice.status },
        };
      });

      return {
        name: customer.name,
        series,
      };
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
