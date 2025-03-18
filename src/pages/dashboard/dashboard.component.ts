import { Component, inject } from '@angular/core';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice-service/invoice.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardListComponent, CommonModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private customerService = inject(CustomerServiceService);
  private invoiceService = inject(InvoiceService);
  customers$ = this.customerService.latestCustomers$;
  invoices$ = this.invoiceService.latestInvoices$;

  ngOnInit() {
    this.customerService.getCustomers();
    this.invoiceService.getInvoices();
  }
}
