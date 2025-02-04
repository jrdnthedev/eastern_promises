import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalComponent } from './edit-modal.component';
import { EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerServiceService } from '../../../../services/customer-service/customer-service.service';

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let mockCustomerService: jasmine.SpyObj<CustomerServiceService>;

  beforeEach(async () => {
    mockCustomerService = jasmine.createSpyObj('CustomerServiceService', [
      'editCustomer',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EditModalComponent],
      providers: [
        { provide: CustomerServiceService, useValue: mockCustomerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.customer = {
      id: '1',
      name: 'John Doe',
      image_url: '',
      email: 'john@example.com',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize the form with customer data', () => {
    component.customer = {
      id: '1',
      name: 'John Doe',
      image_url: '',
      email: 'john@example.com',
    };
    fixture.detectChanges();

    expect(component.updatedCustomer.value).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should call editCustomer and close modal when updateCustomer is called', () => {
    component.customer = {
      id: '1',
      name: 'John Doe',
      image_url: '',
      email: 'john@example.com',
    };
    component.destroy = new EventEmitter<void>();
    spyOn(component.destroy, 'emit');

    fixture.detectChanges();
    component.updatedCustomer.setValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });

    component.updateCustomer();

    expect(mockCustomerService.editCustomer).toHaveBeenCalledWith({
      id: '1',
      name: 'Jane Doe',
      image_url: '',
      email: 'jane@example.com',
    });
    expect(component.destroy.emit).toHaveBeenCalled();
  });

  it('should emit destroy event when closeModal is called', () => {
    component.destroy = new EventEmitter<void>();
    spyOn(component.destroy, 'emit');

    component.closeModal();

    expect(component.destroy.emit).toHaveBeenCalled();
  });
});
