import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Customer } from '../../types/types';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  @Input() customer!: Customer;
  updatedCustomer!: FormGroup;
  private customerService = inject(CustomerServiceService);
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

  updateCustomer() {
    const customer: Customer = {
      ...this.customer,
      name: this.updatedCustomer.value.name,
      email: this.updatedCustomer.value.email,
    };
    this.customerService.editCustomer(customer).subscribe();
    this.closeModal();
  }
}
