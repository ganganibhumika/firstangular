import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDiscountComponent } from './offer-discount.component';

describe('OfferDiscountComponent', () => {
  let component: OfferDiscountComponent;
  let fixture: ComponentFixture<OfferDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
