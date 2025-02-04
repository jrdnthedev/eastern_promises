import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Invoice } from '../../types/types';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;
  const backendUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoiceService],
    });
    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch invoices and update observables', () => {
    const mockInvoices: Invoice[] = [
      {
        id: 'd6e15627-9fe1-4961-8c5b-ea44a9bd81aa',
        customer_id: 1,
        amount: 15795,
        status: 'pending',
        date: '2022-12-06',
      },
      {
        id: '3958dc3e-712f-4377-85e9-fec4b6a6442a',
        customer_id: 2,
        amount: 20348,
        status: 'pending',
        date: '2022-11-14',
      },
      {
        id: '3958dc9e-142f-4377-85e9-fec4b6a6442a',
        customer_id: 3,
        amount: 3040,
        status: 'paid',
        date: '2022-10-29',
      },
      {
        id: '76d25c26-f784-44a2-kc19-586678f7c2f2',
        customer_id: 4,
        amount: 44800,
        status: 'paid',
        date: '2023-09-10',
      },
    ];

    service.getInvoices();

    const req = httpMock.expectOne(`${backendUrl}/invoices`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoices);

    service.invoice$.subscribe((invoices) => {
      expect(invoices).toEqual(mockInvoices);
    });

    service.latestInvoices$.subscribe((latestInvoices) => {
      expect(latestInvoices).toEqual(mockInvoices.slice(-3));
    });
  });

  it('should send a PUT request when editing an invoice', () => {
    const updatedInvoice: Invoice = {
      id: 'd6e15627-9fe1-4961-8c5b-ea44a9bd81aa',
      customer_id: 13,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    };

    service.editInvoice(updatedInvoice).subscribe((response) => {
      expect(response).toEqual(updatedInvoice);
    });

    const req = httpMock.expectOne(`${backendUrl}/invoices/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedInvoice);
    req.flush(updatedInvoice);
  });

  it('should send a POST request when creating an invoice', () => {
    const newInvoice: Invoice = {
      id: 'd6e15627-9fe1-4961-8c5b-ea44a9bd81aa',
      customer_id: 13,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    };

    service.createInvoice(newInvoice);

    const req = httpMock.expectOne(`${backendUrl}/invoices`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newInvoice);
    req.flush(newInvoice);
  });
});
