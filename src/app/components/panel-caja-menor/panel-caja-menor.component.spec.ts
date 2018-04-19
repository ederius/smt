import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCajaMenorComponent } from './panel-caja-menor.component';

describe('PanelCajaMenorComponent', () => {
  let component: PanelCajaMenorComponent;
  let fixture: ComponentFixture<PanelCajaMenorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCajaMenorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCajaMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
