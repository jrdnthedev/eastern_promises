import {
  Component,
  ComponentRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { Customer } from '../../types/types';

@Component({
  selector: 'app-customers',
  imports: [TableComponent, CommonModule],
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  private customerService = inject(CustomerServiceService);
  customers$ = this.customerService.customer$;
  @ViewChild('dynamicEditModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  editModalContainer!: ViewContainerRef;

  @ViewChild('dynamicAddCustomerModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  addCustomerModalContainer!: ViewContainerRef;
  componentRef?: ComponentRef<EditModalComponent>;
  addcomponentRef?: ComponentRef<AddModalComponent>;

  ngOnInit() {
    this.customerService.getCustomers();
  }

  createCustomer() {
    this.addCustomerModalContainer.clear();
    this.addcomponentRef =
      this.addCustomerModalContainer.createComponent(AddModalComponent);
    this.addcomponentRef.instance.destroy.subscribe(() => {
      this.addCustomerModalContainer.clear();
      this.closeModal();
    });
  }

  editCustomer(customer: Customer) {
    this.editModalContainer.clear();
    this.componentRef =
      this.editModalContainer.createComponent(EditModalComponent);
    this.componentRef.instance.customer = customer;
    this.componentRef.instance.destroy.subscribe(() => {
      this.editModalContainer.clear();
      this.closeModal();
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deteleCustomer(id);
  }

  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
