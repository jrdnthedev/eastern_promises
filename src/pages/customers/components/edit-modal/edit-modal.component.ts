import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../../types/types';
import { Store } from '@ngrx/store';
import { KeytrapDirective } from '../../../../directives/keytrap/keytrap.directive';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule, ReactiveFormsModule, KeytrapDirective],
  standalone: true,
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  @Input() customer!: Customer;
  updatedCustomer!: FormGroup;
  private store = inject(Store);
  @Output() destroy = new EventEmitter<void>();

  ngOnInit() {
    this.updatedCustomer = new FormGroup({
      name: new FormControl(this.customer.name, [Validators.required]),
      email: new FormControl(this.customer.email, [Validators.required]),
    });
  }

  closeModal() {
    console.log('Close modal');
    this.destroy.emit();
  }

  updateCustomer(e: Event) {
    e.preventDefault();
    const customer: Customer = {
      ...this.customer,
      name: this.updatedCustomer.value.name,
      email: this.updatedCustomer.value.email,
    };

    this.store.dispatch({
      type: '[Customers] Update Customer',
      ...customer,
    });
    this.closeModal();
  }
}
