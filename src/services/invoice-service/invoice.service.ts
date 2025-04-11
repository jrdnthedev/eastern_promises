import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Invoice } from '../../types/types';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceSubject = new BehaviorSubject<Invoice[]>([]);
  invoice$ = this.invoiceSubject.asObservable();
  private latestInvoices = new ReplaySubject<Invoice[]>(1);
  latestInvoices$ = this.latestInvoices.asObservable();
  private store = inject(Store);
  constructor() {}

  getInvoices(): void {
    this.store.select('invoices').subscribe((invoices: Invoice[]) => {
      this.invoiceSubject.next(invoices);
      this.latestInvoices.next(invoices.slice(-3));
    });
  }
}
