import { TestBed, inject } from '@angular/core/testing';

import { SupportedCurrencyService } from './supported-currency.service';

describe('SupportedCurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportedCurrencyService]
    });
  });

  it('should be created', inject([SupportedCurrencyService], (service: SupportedCurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
