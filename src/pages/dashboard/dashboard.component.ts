import { Component, inject } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { Customer, Invoice, Revenue } from '../../types/types';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { RevenueService } from '../../services/revenue-service/revenue.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private customerService = inject(CustomerServiceService);
  private invoiceService = inject(InvoiceService);
  private revenueService = inject(RevenueService);
  customers: Customer[] = [];
  invoices: Invoice[] = [];
  revenue: Revenue[] = [];

  ngOnInit() {
    forkJoin([
      this.customerService.getCustomers(),
      this.invoiceService.getInvoices(),
      this.revenueService.getRevenue(),
    ]).subscribe(([customers, invoices, revenue]) => {
      this.customers = customers;
      this.invoices = invoices;
      this.revenue = revenue;
    });
  }
}
