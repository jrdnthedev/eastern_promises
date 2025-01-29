import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  constructor() {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.backendUrl}/customers`);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.backendUrl}/customers/${customer.id}`,
      customer
    );
  }
}
