import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinNavbarComponent } from './pin-navbar.component';

describe('PinNavbarComponent', () => {
  let component: PinNavbarComponent;
  let fixture: ComponentFixture<PinNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
