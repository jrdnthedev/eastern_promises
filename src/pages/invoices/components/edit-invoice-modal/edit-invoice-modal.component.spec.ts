import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceModalComponent } from './edit-invoice-modal.component';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { InvoiceService } from '../../../../services/invoice-service/invoice.service';

describe('EditInvoiceModalComponent', () => {
  let component: EditInvoiceModalComponent;
  let fixture: ComponentFixture<EditInvoiceModalComponent>;
  let mockInvoiceService: jasmine.SpyObj<InvoiceService>;

  beforeEach(async () => {
    mockInvoiceService = jasmine.createSpyObj('InvoiceService', [
      'editInvoice',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EditInvoiceModalComponent],
      providers: [{ provide: InvoiceService, useValue: mockInvoiceService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvoiceModalComponent);
    component = fixture.componentInstance;

    // Set required @Input() before initializing component
    component.invoice = {
      id: '123',
      customer_id: 1,
      amount: 500,
      status: 'pending',
      date: '2021-01-01',
    };

    // Spy on the destroy event emitter
    spyOn(component.destroy, 'emit');

    fixture.detectChanges(); // Apply changes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with invoice data', () => {
    expect(component.updatedInvoice).toBeDefined();
    expect(component.updatedInvoice.value).toEqual({
      customer_id: 1,
      amount: 500,
      status: 'pending',
    });
  });

  it('should emit destroy event when closeModal is called', () => {
    component.closeModal();
    expect(component.destroy.emit).toHaveBeenCalled();
  });

  it('should call editInvoice and close modal when updateInvoice is called', () => {
    mockInvoiceService.editInvoice.and.returnValue(
      of({
        id: '123',
        customer_id: 1,
        amount: 500,
        status: 'pending',
        date: '2021-01-01',
      })
    ); // Mock API response

    component.updateInvoice();

    expect(mockInvoiceService.editInvoice).toHaveBeenCalledWith({
      id: '123',
      customer_id: 1,
      amount: 500,
      status: 'pending',
      date: '2021-01-01',
    });
    expect(component.destroy.emit).toHaveBeenCalled();
  });
});
