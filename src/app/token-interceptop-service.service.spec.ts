import { TestBed } from '@angular/core/testing';

import { TokenInterceptopServiceService } from './token-interceptop-service.service';

describe('TokenInterceptopServiceService', () => {
  let service: TokenInterceptopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
