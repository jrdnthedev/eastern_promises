import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private backendUrl = 'http://localhost:3000';

  constructor() {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.backendUrl}/invoices`);
  }
}
