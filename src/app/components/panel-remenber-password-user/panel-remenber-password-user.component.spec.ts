import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRemenberPasswordUserComponent } from './panel-remenber-password-user.component';

describe('PanelRemenberPasswordUserComponent', () => {
  let component: PanelRemenberPasswordUserComponent;
  let fixture: ComponentFixture<PanelRemenberPasswordUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRemenberPasswordUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRemenberPasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
