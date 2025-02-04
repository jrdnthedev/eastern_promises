import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ElementRef } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isHidden as true', () => {
    expect(component.isHidden).toBeTrue();
  });

  it('should set isMobile to true if window width is less than 768px', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    component.ngOnInit();
    expect(component.isMobile).toBeTrue();
  });

  it('should set isMobile to false if window width is greater than or equal to 768px', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.ngOnInit();
    expect(component.isMobile).toBeFalse();
  });

  it('should update isMobile on window resize', () => {
    const event = new Event('resize');
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(700);
    component.onResize(event);
    expect(component.isMobile).toBeTrue();

    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(900);
    component.onResize(event);
    expect(component.isMobile).toBeFalse();
  });

  it('should hide sidebar when clicking outside on mobile', () => {
    component.isMobile = true;
    component.isHidden = false;
    component.asideDiv = new ElementRef(document.createElement('div'));
    component.asideBtnDiv = new ElementRef(document.createElement('button'));

    const event = new MouseEvent('click', { bubbles: true });
    spyOn(component.asideDiv.nativeElement, 'contains').and.returnValue(false);
    spyOn(component.asideBtnDiv.nativeElement, 'contains').and.returnValue(
      false
    );

    component.onDocumentClick(event);
    expect(component.isHidden).toBeTrue();
  });

  it('should not hide sidebar when clicking inside', () => {
    component.isMobile = true;
    component.isHidden = false;
    component.asideDiv = new ElementRef(document.createElement('div'));
    component.asideBtnDiv = new ElementRef(document.createElement('button'));

    const event = new MouseEvent('click', { bubbles: true });
    spyOn(component.asideDiv.nativeElement, 'contains').and.returnValue(true);

    component.onDocumentClick(event);
    expect(component.isHidden).toBeFalse();
  });
});
