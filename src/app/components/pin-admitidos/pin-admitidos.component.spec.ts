import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinAdmitidosComponent } from './pin-admitidos.component';

describe('PinAdmitidosComponent', () => {
  let component: PinAdmitidosComponent;
  let fixture: ComponentFixture<PinAdmitidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinAdmitidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinAdmitidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
