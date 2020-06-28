import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarplatesComponent } from './carplates.component';

describe('CarplatesComponent', () => {
  let component: CarplatesComponent;
  let fixture: ComponentFixture<CarplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
