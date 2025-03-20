import { Component, inject } from '@angular/core';
import { VerticalBarChartComponent } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Revenue } from '../../types/types';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-revenue',
  imports: [VerticalBarChartComponent],
  standalone: true,
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  chartTitle = 'Revenue Chart';
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerServiceService);
  invoices$ = this.invoiceService.invoice$;
  invoiceData: Revenue[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.invoiceService.getInvoices();
    this.createRevenueData();
  }
  createRevenueData() {
    this.invoices$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((invoices: any[]) =>
          forkJoin(
            invoices.map((item) =>
              this.customerService.getCustomerById(item.customer_id).pipe(
                map((customer) => ({
                  ...item,
                  customer_name: customer.name,
                }))
              )
            )
          )
        ),
        map((invoicesWithNames) =>
          invoicesWithNames.reduce((acc, item) => {
            if (!acc[item.customer_id]) {
              acc[item.customer_id] = {
                name: item.customer_name,
                series: [],
              };
            }
            acc[item.customer_id].series.push({
              name: item.date.split('-')[0],
              value: item.amount,
              extra: { code: item.customer_id },
            });
            return acc;
          }, {} as Record<string, Revenue>)
        ),
        map((groupedItems) => Object.values(groupedItems))
      )
      .subscribe((result) => (this.invoiceData = result as Revenue[]));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
