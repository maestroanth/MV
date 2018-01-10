import { TestBed, inject } from '@angular/core/testing';

import { UniverseFetcherService } from './universe-fetcher.service';

describe('UniverseFetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniverseFetcherService]
    });
  });

  it('should be created', inject([UniverseFetcherService], (service: UniverseFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
