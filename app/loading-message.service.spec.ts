import { TestBed, inject } from '@angular/core/testing';

import { LoadingMessageService } from './loading-message.service';

describe('LoadingmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingmessageService]
    });
  });

  it('should be created', inject([LoadingmessageService], (service: LoadingmessageService) => {
    expect(service).toBeTruthy();
  }));
});
