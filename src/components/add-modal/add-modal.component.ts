import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../types/types';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  @Output() destroy = new EventEmitter<void>();
  createCustomerGroup!: FormGroup;
  customerService = inject(CustomerServiceService);

  ngOnInit() {
    this.createCustomerGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  createCustomer() {
    if (this.createCustomerGroup.valid) {
      const customer: Customer = {
        id: this.generateUUID(),
        name: this.createCustomerGroup.value.name,
        email: this.createCustomerGroup.value.email,
        image_url: '',
      };
      this.customerService.createCustomer(customer);
      this.destroy.emit();
    }
  }

  closeModal() {
    this.destroy.emit();
  }
}
