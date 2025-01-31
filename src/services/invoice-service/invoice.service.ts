import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { Invoice } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';
  private invoiceSubject = new BehaviorSubject<Invoice[]>([]);
  invoice$ = this.invoiceSubject.asObservable();
  private latestInvoices = new ReplaySubject<Invoice[]>(1);
  latestInvoices$ = this.latestInvoices.asObservable();
  constructor() {}

  getInvoices(): void {
    this.http
      .get<Invoice[]>(`${this.backendUrl}/invoices`)
      .subscribe((invoices: Invoice[]) => {
        this.invoiceSubject.next(invoices);
        this.latestInvoices.next(invoices.slice(-3));
      });
  }

  editInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http
      .put<Invoice>(`${this.backendUrl}/invoices/${invoice.id}`, invoice)
      .pipe(
        tap(() => {
          console.log('Invoice updated', invoice);
          this.getInvoices();
        })
      );
  }

  createInvoice(invoice: Invoice): void {
    this.http
      .post<Invoice>(`${this.backendUrl}/invoices`, invoice)
      .pipe(tap(() => this.getInvoices()));
  }
}
