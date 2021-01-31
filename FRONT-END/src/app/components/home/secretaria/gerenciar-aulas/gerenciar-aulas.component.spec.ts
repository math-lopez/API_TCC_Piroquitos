import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAulasComponent } from './gerenciar-aulas.component';

describe('GerenciarAulasComponent', () => {
  let component: GerenciarAulasComponent;
  let fixture: ComponentFixture<GerenciarAulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarAulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
