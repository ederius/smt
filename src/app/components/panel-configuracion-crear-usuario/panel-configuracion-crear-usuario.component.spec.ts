import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfiguracionCrearUsuarioComponent } from './panel-configuracion-crear-usuario.component';

describe('PanelConfiguracionCrearUsuarioComponent', () => {
  let component: PanelConfiguracionCrearUsuarioComponent;
  let fixture: ComponentFixture<PanelConfiguracionCrearUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConfiguracionCrearUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConfiguracionCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
