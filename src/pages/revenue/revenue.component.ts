import { Component, inject } from '@angular/core';
import { VerticalBarChartComponent } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { Customer, Invoice, Revenue } from '../../types/types';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { forkJoin, Subject, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util-service/util.service';

@Component({
  selector: 'app-revenue',
  imports: [VerticalBarChartComponent, CommonModule],
  standalone: true,
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  chartTitle = 'Revenue Chart';
  invoiceData: Revenue[] = [];
  private destroy$ = new Subject<void>();
  private store = inject(Store);

  ngOnInit() {
    this.createRevenueData();
  }
  createRevenueData() {
    const customers$ = this.store.select('customers').pipe(take(1));
    const invoices$ = this.store.select('invoices').pipe(take(1));
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
    return customers.map((customer) => {
      const customerInvoices = invoices.filter(
        (inv) => inv.customer_id === customer.id
      );

      const series = customerInvoices.map((invoice) => {
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
