import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Customer, Invoice, InvoiceStatus } from '../../../../types/types';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvoiceService } from '../../../../services/invoice-service/invoice.service';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';
import { Store } from '@ngrx/store';
import { KeytrapDirective } from '../../../../directives/keytrap/keytrap.directive';

@Component({
  selector: 'app-edit-invoice-modal',
  imports: [FormsModule, ReactiveFormsModule, KeytrapDirective],
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
  private store = inject(Store);

  ngOnInit() {
    this.updatedInvoice = new FormGroup({
      customer_id: new FormControl(
        this.invoice.customer_id,
        Validators.required
      ),
      amount: new FormControl(this.invoice.amount, Validators.required),
      status: new FormControl(this.invoice.status),
    });

    this.store.select('customers').subscribe((customers) => {
      const customer = customers.find(
        (customer: Customer) => customer.id === this.invoice.customer_id
      );
      if (customer) {
        this.customerName = customer.name;
      }
    });
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

    this.store.dispatch({
      type: '[Invoices] Update Invoice',
      id: updatedInvoice.id,
      amount: updatedInvoice.amount,
      status: updatedInvoice.status,
      date: updatedInvoice.date,
      customer_id: updatedInvoice.customer_id,
    });
    this.closeModal();
  }
}
