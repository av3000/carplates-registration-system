import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarplateComponent } from './form-carplate.component';

describe('FormCarplateComponent', () => {
  let component: FormCarplateComponent;
  let fixture: ComponentFixture<FormCarplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCarplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCarplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
