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

import { Store } from '@ngrx/store';
import { selectFeatureCustomers } from './customers.selectors';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
@Component({
  selector: 'app-customers',
  imports: [TableComponent, CommonModule],
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  private InvoiceService = inject(InvoiceService);
  private store = inject(Store);
  customers$ = this.store.select(selectFeatureCustomers);

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

  ngOnInit() {}

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
    // this.customerService.deteleCustomer(id);
    this.store.dispatch({
      type: '[Customers] Delete Customer',
      id: id,
    });
  }

  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
