import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have default current page as 1', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should have default items per page as 10', () => {
    expect(component.itemsPerPage).toBe(10);
  });

  it('should have default total items as 0', () => {
    expect(component.totalItems).toBe(0);
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    fixture.detectChanges();
    expect(component.totalPages).toBe(5);
  });

  it('should generate correct pages array', () => {
    component.totalItems = 30;
    component.itemsPerPage = 10;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should emit pageChange event when a valid page is selected', () => {
    spyOn(component.pageChange, 'emit');
    component.onPageChange(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange event when an invalid page is selected', () => {
    spyOn(component.pageChange, 'emit');
    component.onPageChange(0);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should not emit pageChange event when a page number greater than totalPages is selected', () => {
    component.totalItems = 10;
    component.itemsPerPage = 10;
    fixture.detectChanges();
    spyOn(component.pageChange, 'emit');
    component.onPageChange(2);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
});
