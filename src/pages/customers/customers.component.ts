import {
  Component,
  ComponentRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { Customer } from '../../types/types';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  private customerService = inject(CustomerServiceService);
  customers$ = this.customerService.customer$;
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  componentRef?: ComponentRef<EditModalComponent>;

  ngOnInit() {
    this.customerService.getCustomers();
  }

  editCustomer(customer: Customer) {
    this.container.clear();
    this.componentRef = this.container.createComponent(EditModalComponent);
    this.componentRef.instance.customer = customer;
    this.componentRef.instance.destroy.subscribe(() => {
      this.container.clear();
      this.closeModal();
    });
  }

  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
