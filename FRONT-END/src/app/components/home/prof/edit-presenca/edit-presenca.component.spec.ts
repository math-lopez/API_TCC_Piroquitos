import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPresencaComponent } from './edit-presenca.component';

describe('EditPresencaComponent', () => {
  let component: EditPresencaComponent;
  let fixture: ComponentFixture<EditPresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
