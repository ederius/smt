import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculadosComponent } from './matriculados.component';

describe('MatriculadosComponent', () => {
  let component: MatriculadosComponent;
  let fixture: ComponentFixture<MatriculadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
