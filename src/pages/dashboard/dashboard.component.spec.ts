import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CustomerServiceService } from '../../services/customer-service/customer-service.service';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let customerService: jasmine.SpyObj<CustomerServiceService>;
  let invoiceService: jasmine.SpyObj<InvoiceService>;

  beforeEach(async () => {
    const customerServiceSpy = jasmine.createSpyObj(
      'CustomerServiceService',
      ['getCustomers'],
      { latestCustomers$: of([]) }
    );
    const invoiceServiceSpy = jasmine.createSpyObj(
      'InvoiceService',
      ['getInvoices'],
      { latestInvoices$: of([]) }
    );

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: CustomerServiceService, useValue: customerServiceSpy },
        { provide: InvoiceService, useValue: invoiceServiceSpy },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    customerService = TestBed.inject(
      CustomerServiceService
    ) as jasmine.SpyObj<CustomerServiceService>;
    invoiceService = TestBed.inject(
      InvoiceService
    ) as jasmine.SpyObj<InvoiceService>;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCustomers on customerService during ngOnInit', () => {
    expect(customerService.getCustomers).toHaveBeenCalled();
  });

  it('should call getInvoices on invoiceService during ngOnInit', () => {
    expect(invoiceService.getInvoices).toHaveBeenCalled();
  });

  it('should initialize customers$ observable from customerService', (done) => {
    component.customers$.subscribe((customers) => {
      expect(customers).toEqual([]);
      done();
    });
  });

  it('should initialize invoices$ observable from invoiceService', (done) => {
    component.invoices$.subscribe((invoices) => {
      expect(invoices).toEqual([]);
      done();
    });
  });
});
