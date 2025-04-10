import {
  Component,
  ComponentRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { Customer } from '../../types/types';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-customers',
  imports: [TableComponent, CommonModule],
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  private store = inject(Store);
  customers$ = this.store.select('customers');

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
    this.store.dispatch({
      type: '[Customers] Delete Customer',
      id: id,
    });
    this.store.dispatch({
      type: '[Invoices] Delete All Invoices',
      id: id,
    });
  }

  closeModal() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
