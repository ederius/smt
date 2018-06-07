import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfiguracionSemestreComponent } from './panel-configuracion-semestre.component';

describe('PanelConfiguracionSemestreComponent', () => {
  let component: PanelConfiguracionSemestreComponent;
  let fixture: ComponentFixture<PanelConfiguracionSemestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConfiguracionSemestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConfiguracionSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
