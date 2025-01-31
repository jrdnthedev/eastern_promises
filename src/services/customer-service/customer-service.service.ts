import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../../types/types';
import { BehaviorSubject, Observable, ReplaySubject, scan, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  private customerSubject = new BehaviorSubject<Customer[]>([]);
  customer$ = this.customerSubject.asObservable();
  private latestCustomers = new ReplaySubject<Customer[]>(1);
  latestCustomers$ = this.latestCustomers.asObservable();
  constructor() {}

  getCustomers(): void {
    this.http
      .get<Customer[]>(`${this.backendUrl}/customers`)
      .subscribe((customers: Customer[]) => {
        this.customerSubject.next(customers);
        this.latestCustomers.next(customers.slice(-3));
      });
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.backendUrl}/customers/${customer.id}`, customer)
      .pipe(tap(() => this.getCustomers()));
  }

  createCustomer(customer: Customer): void {
    this.http
      .post<Customer>(`${this.backendUrl}/customers`, customer)
      .pipe(tap(() => this.getCustomers()));
  }
}
