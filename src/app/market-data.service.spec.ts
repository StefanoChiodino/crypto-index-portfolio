import { TestBed, inject } from '@angular/core/testing';

import { MarketDataService } from './market-data.service';
import { SupportedCurrencyService } from './supported-currency.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('MarketDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarketDataService, HttpClient, SupportedCurrencyService]
    });
  });

  it('should be created', inject([MarketDataService], (service: MarketDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return the specified number of items',
    inject(
      [MarketDataService, SupportedCurrencyService],
      (service: MarketDataService, supportedCurrencyService: SupportedCurrencyService) => {
        const currency = supportedCurrencyService.getSupportedCurrencies()[0];
        service.getMarketData(10, currency)
          .subscribe(data => expect(data.length).toBe(10));
      }));
});
