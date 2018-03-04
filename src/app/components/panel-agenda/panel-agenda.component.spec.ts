import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAgendaComponent } from './panel-agenda.component';

describe('PanelAgendaComponent', () => {
  let component: PanelAgendaComponent;
  let fixture: ComponentFixture<PanelAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
