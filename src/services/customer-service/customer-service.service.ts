import { inject, Injectable } from '@angular/core';
import { Customer } from '../../types/types';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { InvoiceService } from '../invoice-service/invoice.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  private customerSubject = new BehaviorSubject<Customer[]>([]);
  customer$ = this.customerSubject.asObservable();
  private latestCustomers = new ReplaySubject<Customer[]>(1);
  latestCustomers$ = this.latestCustomers.asObservable();
  invoices = inject(InvoiceService);
  private store = inject(Store);
  constructor() {}

  getCustomers(): void {
    this.store.select('customers').subscribe((customers: Customer[]) => {
      this.customerSubject.next(customers);
      this.latestCustomers.next(customers.slice(-3));
    });
  }
}
