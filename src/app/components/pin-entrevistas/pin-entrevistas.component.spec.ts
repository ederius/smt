import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinEntrevistasComponent } from './pin-entrevistas.component';

describe('PinEntrevistasComponent', () => {
  let component: PinEntrevistasComponent;
  let fixture: ComponentFixture<PinEntrevistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinEntrevistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
