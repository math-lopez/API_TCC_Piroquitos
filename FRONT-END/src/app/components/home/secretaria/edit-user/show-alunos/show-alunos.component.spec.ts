import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAlunosComponent } from './show-alunos.component';

describe('ShowAlunosComponent', () => {
  let component: ShowAlunosComponent;
  let fixture: ComponentFixture<ShowAlunosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAlunosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
