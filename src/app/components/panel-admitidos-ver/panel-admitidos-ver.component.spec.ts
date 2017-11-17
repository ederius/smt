import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitidosComponent } from './panel-admitidos-ver.component';

describe('AdmitidosComponent', () => {
  let component: AdmitidosComponent;
  let fixture: ComponentFixture<AdmitidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
