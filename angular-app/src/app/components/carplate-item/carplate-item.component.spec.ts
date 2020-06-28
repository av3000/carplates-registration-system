import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarplateItemComponent } from './carplate-item.component';

describe('CarplateItemComponent', () => {
  let component: CarplateItemComponent;
  let fixture: ComponentFixture<CarplateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarplateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
