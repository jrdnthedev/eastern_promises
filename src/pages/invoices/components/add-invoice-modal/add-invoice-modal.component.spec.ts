import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoiceModalComponent } from './add-invoice-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from '../../../../services/invoice-service/invoice.service';
import { UtilService } from '../../../../services/util-service/util.service';

describe('AddInvoiceModalComponent', () => {
  let component: AddInvoiceModalComponent;
  let fixture: ComponentFixture<AddInvoiceModalComponent>;
  let mockInvoiceService: jasmine.SpyObj<InvoiceService>;
  let mockUtilService: jasmine.SpyObj<UtilService>;

  beforeEach(() => {
    mockInvoiceService = jasmine.createSpyObj('InvoiceService', [
      'createInvoice',
    ]);
    mockUtilService = jasmine.createSpyObj('UtilService', ['generateUUID']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        AddInvoiceModalComponent,
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: UtilService, useValue: mockUtilService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddInvoiceModalComponent);
    component = fixture.componentInstance;

    component.invoices = [
      {
        id: '1',
        customer_id: 1,
        amount: 500,
        status: 'pending',
        date: '2024-02-04',
      },
    ];

    mockUtilService.generateUUID.and.returnValue('uuid-1234');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.invoiceGroup.value).toEqual({
      amount: '',
      status: 'paid',
      customer_id: 1,
    });
  });

  it('should call createInvoice and emit destroy event when form is valid', () => {
    spyOn(component.destroy, 'emit');

    component.invoiceGroup.setValue({
      amount: 500,
      status: 'pending',
      customer_id: 1,
    });

    component.createInvoice();

    expect(mockInvoiceService.createInvoice).toHaveBeenCalledWith({
      id: 'uuid-1234',
      amount: 500,
      status: 'pending',
      customer_id: 1,
      date: new Date().toISOString().split('T')[0],
    });

    expect(component.destroy.emit).toHaveBeenCalled();
  });

  it('should not call createInvoice if form is invalid', () => {
    spyOn(component.destroy, 'emit');

    component.invoiceGroup.setValue({
      amount: '',
      status: 'pending',
      customer_id: '123',
    });

    component.createInvoice();

    expect(mockInvoiceService.createInvoice).not.toHaveBeenCalled();
    expect(component.destroy.emit).toHaveBeenCalled();
  });

  it('should emit destroy event when closing modal', () => {
    spyOn(component.destroy, 'emit');

    component.closeModal();

    expect(component.destroy.emit).toHaveBeenCalled();
  });
});
