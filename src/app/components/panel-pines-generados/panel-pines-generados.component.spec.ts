import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPinesGeneradosComponent } from './panel-pines-generados.component';

describe('PanelPinesGeneradosComponent', () => {
  let component: PanelPinesGeneradosComponent;
  let fixture: ComponentFixture<PanelPinesGeneradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPinesGeneradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPinesGeneradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
