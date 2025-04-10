import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../../types/types';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
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

  getCustomerById(id: string): Observable<Customer> {
    return this.store.select('customers').pipe(
      map((customers: Customer[]) => {
        const customer = customers.find((customer) => customer.id === id);
        if (!customer) {
          throw new Error(`Customer with id ${id} not found`);
        }
        return customer;
      })
    );
  }

  // deteleCustomer(id: string): void {
  //   this.http
  //     .delete<Customer>(`${this.backendUrl}/customers/${id}`)
  //     .pipe(
  //       tap(() => {
  //         this.getCustomers();
  //         this.invoices.getInvoices();
  //       })
  //     )
  //     .subscribe();
  // }
}
