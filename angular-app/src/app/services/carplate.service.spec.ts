import { TestBed } from '@angular/core/testing';

import { CarplateService } from './carplate.service';

describe('CarplateService', () => {
  let service: CarplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
