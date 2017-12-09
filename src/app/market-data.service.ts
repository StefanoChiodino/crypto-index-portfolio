import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupportedCurrencyService } from './supported-currency.service';
import { CryptoCurrencyData } from './models/crypto-currency.data';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarketDataService {

  constructor(private readonly httpClient: HttpClient, private readonly supportedCurrencyService: SupportedCurrencyService) { }

  getMarketData(currency?: string, count?: number): Observable<Array<CryptoCurrencyData>> {
    let url = 'https://api.coinmarketcap.com/v1/ticker/?';
    if (currency) {
      url += `convert=${currency}&`;
    }
    if (count) {
      url += `limit=${count}&`;
    }
    return this.httpClient
      .get<Array<CryptoCurrencyData>>(url);
  }
}
