import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  private invoiceSubject = new BehaviorSubject<Invoice[]>([]);
  invoice$ = this.invoiceSubject.asObservable();

  constructor() {}

  getInvoices(): void {
    this.http
      .get<Invoice[]>(`${this.backendUrl}/invoices`)
      .subscribe((invoices: Invoice[]) => this.invoiceSubject.next(invoices));
  }
}
