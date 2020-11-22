import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmMudancaPresencaComponent } from './dialog-confirm-mudanca-presenca.component';

describe('DialogConfirmMudancaPresencaComponent', () => {
  let component: DialogConfirmMudancaPresencaComponent;
  let fixture: ComponentFixture<DialogConfirmMudancaPresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmMudancaPresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmMudancaPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
