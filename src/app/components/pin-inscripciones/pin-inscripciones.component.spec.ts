import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinInscripcionesComponent } from './pin-inscripciones.component';

describe('PinInscripcionesComponent', () => {
  let component: PinInscripcionesComponent;
  let fixture: ComponentFixture<PinInscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinInscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
