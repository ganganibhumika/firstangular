import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInnerDetailComponent } from './stock-inner-detail.component';

describe('StockInnerDetailComponent', () => {
  let component: StockInnerDetailComponent;
  let fixture: ComponentFixture<StockInnerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockInnerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInnerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
