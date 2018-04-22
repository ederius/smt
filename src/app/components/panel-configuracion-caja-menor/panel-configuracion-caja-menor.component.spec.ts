import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfiguracionCajaMenorComponent } from './panel-configuracion-caja-menor.component';

describe('PanelConfiguracionCajaMenorComponent', () => {
  let component: PanelConfiguracionCajaMenorComponent;
  let fixture: ComponentFixture<PanelConfiguracionCajaMenorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConfiguracionCajaMenorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConfiguracionCajaMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
