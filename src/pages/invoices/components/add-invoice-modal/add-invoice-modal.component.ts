import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Invoice, InvoiceStatus } from '../../../../types/types';

@Component({
  selector: 'app-add-invoice-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-invoice-modal.component.html',
  styleUrl: './add-invoice-modal.component.scss',
})
export class AddInvoiceModalComponent {
  @Output() destroy = new EventEmitter<void>();
  @Input() invoices!: Invoice[];
  invoiceGroup!: FormGroup;
  invoiceStatus: InvoiceStatus[] = ['paid', 'pending', 'draft'];

  ngOnInit() {
    this.invoiceGroup = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      status: new FormControl(this.invoiceStatus[0], [Validators.required]),
      customerId: new FormControl(this.invoices[0].customer_id, [
        Validators.required,
      ]),
    });
  }

  createInvoice() {
    console.log('Create invoice', this.invoiceGroup.value);
    this.destroy.emit();
  }

  closeModal() {
    console.log('Close modal');
    this.destroy.emit();
  }
}
