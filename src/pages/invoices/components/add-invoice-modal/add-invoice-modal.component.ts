import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Invoice, InvoiceStatus } from '../../../../types/types';
import { InvoiceService } from '../../../../services/invoice-service/invoice.service';
import { UtilService } from '../../../../services/util-service/util.service';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './add-invoice-modal.component.html',
  styleUrl: './add-invoice-modal.component.scss',
})
export class AddInvoiceModalComponent {
  @Output() destroy = new EventEmitter<void>();
  @Input() invoices!: Invoice[];
  invoiceService = inject(InvoiceService);
  utilService = inject(UtilService);
  customerService = inject(CustomerServiceService);
  invoiceGroup!: FormGroup;
  invoiceStatus: InvoiceStatus[] = ['paid', 'pending', 'draft'];
  uniqueInvoices!: number[];
  customers$ = this.customerService.customer$;
  ngOnInit() {
    this.invoiceGroup = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      status: new FormControl(this.invoiceStatus[0], [Validators.required]),
      customer_id: new FormControl(this.invoices[0].customer_id, [
        Validators.required,
      ]),
    });
    this.customerService.getCustomers();
  }

  createInvoice(e: Event) {
    e.preventDefault();
    if (this.invoiceGroup.valid) {
      const invoice: Invoice = {
        ...this.invoiceGroup.value,
        date: new Date().toISOString().split('T')[0],
        id: this.utilService.generateUUID(),
      };
      this.invoiceService.createInvoice(invoice);
      this.destroy.emit();
    }
  }

  closeModal() {
    console.log('Close modal');
    this.destroy.emit();
  }
}
