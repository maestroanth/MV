import { TestBed, inject } from '@angular/core/testing';

import { APIAccountsService } from './api-accounts.service';

describe('APIAccountsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIAccountsService]
    });
  });

  it('should be created', inject([APIAccountsService], (service: APIAccountsService) => {
    expect(service).toBeTruthy();
  }));
});
