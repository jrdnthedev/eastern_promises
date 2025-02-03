import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  const componentTitle = 'New Card List';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', () => {
    expect(component.title).toBe(componentTitle);
  });

  it('shoud render title in html', () => {
    const heading = fixture.nativeElement.querySelector('h5');
    expect(heading.textContent).toBe(componentTitle);
  });
});
