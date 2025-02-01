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

@Component({
  selector: 'app-edit-invoice-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-invoice-modal.component.html',
  styleUrl: './edit-invoice-modal.component.scss',
})
export class EditInvoiceModalComponent {
  @Input() invoice!: Invoice;
  @Output() destroy = new EventEmitter<void>();
  updatedInvoice!: FormGroup;
  invoiceStatus: InvoiceStatus[] = ['paid', 'pending', 'draft'];
  invoiceService = inject(InvoiceService);

  ngOnInit() {
    this.updatedInvoice = new FormGroup({
      customer_id: new FormControl(
        this.invoice.customer_id,
        Validators.required
      ),
      amount: new FormControl(this.invoice.amount, Validators.required),
      status: new FormControl(this.invoice.status),
    });
  }

  closeModal() {
    this.destroy.emit();
  }

  updateInvoice() {
    const updatedInvoice = {
      ...this.updatedInvoice.value,
      id: this.invoice.id,
    };
    console.log(updatedInvoice);
    this.invoiceService.editInvoice(updatedInvoice).subscribe();
    this.closeModal();
  }
}
