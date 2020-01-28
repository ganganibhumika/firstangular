import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcountComponent } from './user-acount.component';

describe('UserAcountComponent', () => {
  let component: UserAcountComponent;
  let fixture: ComponentFixture<UserAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
