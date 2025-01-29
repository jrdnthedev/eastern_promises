import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { Invoice } from '../../types/types';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  private invoiceService = inject(InvoiceService);
  invoices: Invoice[] = [];

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }
}
