import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferStockListComponent } from './offer-stock-list.component';

describe('OfferStockListComponent', () => {
  let component: OfferStockListComponent;
  let fixture: ComponentFixture<OfferStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
