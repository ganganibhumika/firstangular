import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsReplayComponent } from './contact-us-replay.component';

describe('ContactUsReplayComponent', () => {
  let component: ContactUsReplayComponent;
  let fixture: ComponentFixture<ContactUsReplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsReplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
