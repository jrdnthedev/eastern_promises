import { Component, inject } from '@angular/core';
import { VerticalBarChartComponent } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { map } from 'rxjs/operators';

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
  invoices$ = this.invoiceService.invoice$;
  invoiceData: any[] = [];

  ngOnInit() {
    this.invoiceService.getInvoices();
    this.createRevenueData();
  }
  createRevenueData() {
    this.invoices$
      .pipe(
        map((invoices: any[]) =>
          invoices.reduce((acc, item) => {
            if (!acc[item.customer_id]) {
              acc[item.customer_id] = {
                name: item.customer_id,
                series: [],
              };
            }
            acc[item.customer_id].series.push({
              name: item.date.split('-')[0],
              value: item.amount,
              extra: { code: item.customer_id },
            });
            return acc;
          }, {} as Record<string, { name: string; series: any[] }>)
        ),
        map((groupedItems) => Object.values(groupedItems)) // Convert object to array
      )
      .subscribe((result) => (this.invoiceData = result));
  }
}
