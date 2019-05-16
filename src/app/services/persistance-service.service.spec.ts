import { TestBed } from '@angular/core/testing';

import { PersistanceServiceService } from './persistance-service.service';

describe('PersistanceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersistanceServiceService = TestBed.get(PersistanceServiceService);
    expect(service).toBeTruthy();
  });
});
