import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupportedCurrencyService } from './supported-currency.service';
import { CryptoCurrencyData } from './models/crypto-currency.data';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarketDataService {

  constructor(private readonly httpClient: HttpClient, private readonly supportedCurrencyService: SupportedCurrencyService) { }

  getMarketData(count: number, currency: string): Observable<Array<CryptoCurrencyData>> {
    return this.httpClient
      .get<Array<CryptoCurrencyData>>('https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&limit=${count}');
  }
}
