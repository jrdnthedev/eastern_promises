import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../../types/types';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  private customerSubject = new BehaviorSubject<Customer[]>([]);
  customer$ = this.customerSubject.asObservable();

  constructor() {}

  getCustomers(): void {
    this.http
      .get<Customer[]>(`${this.backendUrl}/customers`)
      .subscribe((customers: Customer[]) =>
        this.customerSubject.next(customers)
      );
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.backendUrl}/customers/${customer.id}`, customer)
      .pipe(tap(() => this.getCustomers()));
  }
}
