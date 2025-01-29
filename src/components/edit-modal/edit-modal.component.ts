import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Customer } from '../../types/types';
import { FormsModule } from '@angular/forms';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  @Input() customer!: Customer;
  private customerService = inject(CustomerServiceService);
  @Output() destroy = new EventEmitter<void>();

  closeModal() {
    console.log('Close modal');
    this.destroy.emit();
  }

  updateCustomer(customer: Customer) {
    this.customerService.editCustomer(customer).subscribe();
    this.closeModal();
  }
}
