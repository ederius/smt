import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinMatriculadosComponent } from './pin-matriculados.component';

describe('PinMatriculadosComponent', () => {
  let component: PinMatriculadosComponent;
  let fixture: ComponentFixture<PinMatriculadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinMatriculadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinMatriculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
