import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresComponent } from './administradores.component';

describe('AdministradoresComponent', () => {
  let component: AdministradoresComponent;
  let fixture: ComponentFixture<AdministradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
