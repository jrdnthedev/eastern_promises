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

  it('should have default page link', () => {
    expect(component.pageLink).toBe('/');
  });

  it('should accept title input', () => {
    component.title = 'My Custom Title';
    fixture.detectChanges();
    expect(component.title).toBe('My Custom Title');
  });

  it('should accept button text input', () => {
    component.btnText = 'Click Me';
    fixture.detectChanges();
    expect(component.btnText).toBe('Click Me');
  });

  it('should accept page link input', () => {
    component.pageLink = '/custom-link';
    fixture.detectChanges();
    expect(component.pageLink).toBe('/custom-link');
  });
});
