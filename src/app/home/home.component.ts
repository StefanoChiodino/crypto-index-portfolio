import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../market-data.service';
import { CryptoCurrencyData } from '../models/crypto-currency.data';
import { SupportedCurrencyService } from '../supported-currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Array<CryptoCurrencyData>;
  amount: 1000;
  count: 10;
  currencies: Array<string>;
  currency: string;
  portfolio: Array<any>;
  loading = true;

  constructor(
    private readonly marketDataService: MarketDataService,
    private readonly supportedCurrencyService: SupportedCurrencyService) { }

  ngOnInit() {
    this.loading = true;
    this.currencies = this.supportedCurrencyService
      .getSupportedCurrencies();
    this.currency = this.currencies[0];
    this.updateMarketData();
  }

  updateMarketData() {
    this.loading = true;
    this.data = new Array<CryptoCurrencyData>();
    this.portfolio = new Array<any>();
    this.marketDataService
      .getMarketData(this.currency)
      .subscribe(data => {
        this.data = data;
        this.loading = false;
        this.update();
      });
  }

  update() {
    if (this.amount > 0
      && this.count > 0
      && this.currency) {
      const currencies = this.data
        .slice(0, this.count);
      const currenciesCap = currencies
        .map(c => this.getMarketCap(c, this.currency))
        .reduce((accumulator, cap) => Number(accumulator) + Number(cap));
      this.portfolio = currencies
        .map(c => {
          const currencyAmount = this.getMarketCap(c, this.currency) / currenciesCap * this.amount;
          return currencyAmount;
        });
    }
  }

  getMarketCap(cryptoCurrencyData: CryptoCurrencyData, currency: string): number {
    const marketCap = cryptoCurrencyData['market_cap_' + currency.toLowerCase()];
    return marketCap;
  }
}
