import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMastersComponent } from './admin-masters.component';

describe('AdminMastersComponent', () => {
  let component: AdminMastersComponent;
  let fixture: ComponentFixture<AdminMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
