import { Component, inject } from '@angular/core';
import { VerticalBarChartComponent } from '../../components/vertical-bar-chart/vertical-bar-chart.component';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Revenue } from '../../types/types';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { Subject } from 'rxjs';
// import { convertIdToName } from '../../utils/utils';
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
  chartTitle = 'Revenue Chart';
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerServiceService);
  invoices$ = this.invoiceService.invoice$;
  invoiceData: Revenue[] = [];
  private destroy$ = new Subject<void>();
  private store = inject(Store);

  ngOnInit() {
    this.invoiceService.getInvoices();
    this.createRevenueData();
  }
  createRevenueData() {
    // this.store.select(selectFeatureCustomers)
    // convertIdToName(this.invoices$, this.customerService)
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     finalize(() => console.log('Unsubscribed!'))
    //   )
    //   .subscribe((result) => (this.invoiceData = result));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
