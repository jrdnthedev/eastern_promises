import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../../../types/types';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';
import { UtilService } from '../../../../services/util-service/util.service';
import { Store } from '@ngrx/store';
import { KeytrapDirective } from '../../../../directives/keytrap/keytrap.directive';

@Component({
  selector: 'app-add-modal',
  imports: [FormsModule, ReactiveFormsModule, KeytrapDirective],
  standalone: true,
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  @Output() destroy = new EventEmitter<void>();
  createCustomerGroup!: FormGroup;
  customerService = inject(CustomerServiceService);
  utilService = inject(UtilService);
  private store = inject(Store);
  ngOnInit() {
    this.createCustomerGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  createCustomer(e: Event) {
    e.preventDefault();
    if (this.createCustomerGroup.valid) {
      const customer: Customer = {
        id: this.utilService.generateUUID(),
        name: this.createCustomerGroup.value.name,
        email: this.createCustomerGroup.value.email,
        image_url: '',
      };
      this.store.dispatch({
        type: '[Customers] Add Customer',
        ...customer,
      });
      this.destroy.emit();
    }
  }

  closeModal() {
    this.destroy.emit();
  }
}
