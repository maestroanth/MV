import { TestBed, inject } from '@angular/core/testing';

import { SageUserService } from './sage-user.service';

describe('SageUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SageUserService]
    });
  });

  it('should be created', inject([SageUserService], (service: SageUserService) => {
    expect(service).toBeTruthy();
  }));
});
