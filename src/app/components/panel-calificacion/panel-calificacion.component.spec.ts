import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCalificacionComponent } from './panel-calificacion.component';

describe('PanelCalificacionComponent', () => {
  let component: PanelCalificacionComponent;
  let fixture: ComponentFixture<PanelCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
