import { TestBed } from '@angular/core/testing';

import { CustomerServiceService } from './customer-service.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Customer } from '../../types/types';

describe('CustomerServiceService', () => {
  let service: CustomerServiceService;
  let httpMock: HttpTestingController;
  const backendUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerServiceService],
    });
    service = TestBed.inject(CustomerServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customers and update observables', () => {
    const mockCustomers: Customer[] = [
      { id: '1', name: 'Alice', email: '', image_url: '' },
      { id: '2', name: 'Bob', email: '', image_url: '' },
      { id: '3', name: 'Charlie', email: '', image_url: '' },
      { id: '4', name: 'David', email: '', image_url: '' },
    ];

    service.getCustomers();

    const req = httpMock.expectOne(`${backendUrl}/customers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);

    service.customer$.subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });

    service.latestCustomers$.subscribe((latestCustomers) => {
      expect(latestCustomers).toEqual(mockCustomers.slice(-3));
    });
  });

  it('should send a PUT request when editing a customer', () => {
    const updatedCustomer: Customer = {
      id: '1',
      name: 'Alice Updated',
      email: '',
      image_url: '',
    };
    service.editCustomer(updatedCustomer);

    const req = httpMock.expectOne(`${backendUrl}/customers/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCustomer);
    req.flush(updatedCustomer);
  });

  it('should send a POST request when creating a customer', () => {
    const newCustomer: Customer = {
      id: '5',
      name: 'Eve',
      email: '',
      image_url: '',
    };
    service.createCustomer(newCustomer);

    const req = httpMock.expectOne(`${backendUrl}/customers`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCustomer);
    req.flush(newCustomer);
  });
});
