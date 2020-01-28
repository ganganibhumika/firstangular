import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferStockDetailViewComponent } from './offer-stock-detail-view.component';

describe('OfferStockDetailViewComponent', () => {
  let component: OfferStockDetailViewComponent;
  let fixture: ComponentFixture<OfferStockDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferStockDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferStockDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
