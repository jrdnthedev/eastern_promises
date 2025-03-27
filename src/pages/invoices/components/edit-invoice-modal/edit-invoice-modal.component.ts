import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Invoice, InvoiceStatus } from '../../../../types/types';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvoiceService } from '../../../../services/invoice-service/invoice.service';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';

@Component({
  selector: 'app-edit-invoice-modal',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './edit-invoice-modal.component.html',
  styleUrl: './edit-invoice-modal.component.scss',
})
export class EditInvoiceModalComponent {
  @Input() invoice!: Invoice;
  @Output() destroy = new EventEmitter<void>();
  updatedInvoice!: FormGroup;
  invoiceStatus: InvoiceStatus[] = ['paid', 'pending', 'draft'];
  invoiceService = inject(InvoiceService);
  customerService = inject(CustomerServiceService);
  customerName = '';

  ngOnInit() {
    this.updatedInvoice = new FormGroup({
      customer_id: new FormControl(
        this.invoice.customer_id,
        Validators.required
      ),
      amount: new FormControl(this.invoice.amount, Validators.required),
      status: new FormControl(this.invoice.status),
    });
    this.customerService
      .getCustomerById(this.invoice.customer_id)
      .subscribe((customer) => (this.customerName = customer.name));
  }

  closeModal() {
    this.destroy.emit();
  }

  updateInvoice(e: Event) {
    e.preventDefault();
    const updatedInvoice = {
      ...this.updatedInvoice.value,
      id: this.invoice.id,
      date: this.invoice.date,
    };
    console.log(updatedInvoice);
    this.invoiceService.editInvoice(updatedInvoice).subscribe();
    this.closeModal();
  }
}
