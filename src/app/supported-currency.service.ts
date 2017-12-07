import { Injectable } from '@angular/core';

@Injectable()
export class SupportedCurrencyService {
  supportedCurrencies = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

  constructor() { }

  getSupportedCurrencies(): Array<string> {
    return this.supportedCurrencies;
  }
}
