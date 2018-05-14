import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfiguracionListarUsuariosComponent } from './panel-configuracion-listar-usuarios.component';

describe('PanelConfiguracionListarUsuariosComponent', () => {
  let component: PanelConfiguracionListarUsuariosComponent;
  let fixture: ComponentFixture<PanelConfiguracionListarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConfiguracionListarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConfiguracionListarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
