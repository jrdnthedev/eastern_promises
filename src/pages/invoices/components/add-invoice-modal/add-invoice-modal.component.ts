import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Invoice, InvoiceStatus } from '../../../../types/types';
import { UtilService } from '../../../../services/util-service/util.service';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { KeytrapDirective } from '../../../../directives/keytrap/keytrap.directive';

@Component({
  selector: 'app-add-invoice-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, KeytrapDirective],
  standalone: true,
  templateUrl: './add-invoice-modal.component.html',
  styleUrl: './add-invoice-modal.component.scss',
})
export class AddInvoiceModalComponent {
  @Output() destroy = new EventEmitter<void>();
  @Input() invoices!: Invoice[];
  utilService = inject(UtilService);
  customerService = inject(CustomerServiceService);
  invoiceGroup!: FormGroup;
  invoiceStatus: InvoiceStatus[] = ['paid', 'pending', 'draft'];
  private store = inject(Store);
  customers$ = this.store.select('customers');

  ngOnInit() {
    this.invoiceGroup = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      status: new FormControl(this.invoiceStatus[0], [Validators.required]),
      customer_id: new FormControl(this.invoices[0].customer_id, [
        Validators.required,
      ]),
    });
  }

  createInvoice(e: Event) {
    e.preventDefault();
    if (this.invoiceGroup.valid) {
      const invoice: Invoice = {
        ...this.invoiceGroup.value,
        date: new Date().toISOString().split('T')[0],
        id: this.utilService.generateUUID(),
      };
      this.store.dispatch({
        type: '[Invoices] Add Invoice',
        ...invoice,
      });
      this.destroy.emit();
    }
  }

  closeModal() {
    this.destroy.emit();
  }
}
