import { TestBed, inject } from '@angular/core/testing';

import { SageCreationService } from './sage-creation.service';

describe('SageCreationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SageCreationService]
    });
  });

  it('should be created', inject([SageCreationService], (service: SageCreationService) => {
    expect(service).toBeTruthy();
  }));
});
