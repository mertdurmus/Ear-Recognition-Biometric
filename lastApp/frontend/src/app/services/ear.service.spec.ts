import { TestBed } from '@angular/core/testing';

import { EarService } from './ear.service';

describe('EarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EarService = TestBed.get(EarService);
    expect(service).toBeTruthy();
  });
});
