import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../market-data.service';
import { CryptoCurrencyData } from '../models/crypto-currency.data';
import { SupportedCurrencyService } from '../supported-currency.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { PortfolioCryptoCurrencyData } from '../models/portfolio-crypto-currency.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cryptoCurrencyData: Array<CryptoCurrencyData>;
  amount: number;
  count: number;
  currencies: Array<string>;
  currency: string;
  portfolio: Array<PortfolioCryptoCurrencyData>;
  loading = true;
  excludedCryptoCurrencySymbols = new Array<string>();

  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private readonly marketDataService: MarketDataService,
    private readonly supportedCurrencyService: SupportedCurrencyService) { }

  ngOnInit() {
    this.loading = true;
    this.amount = 1000;
    this.count = 10;
    this.currencies = this.supportedCurrencyService
      .getSupportedCurrencies();
    this.currency = this.currencies[0];
    this.updateMarketData();
  }

  updateMarketData() {
    this.loading = true;
    this.cryptoCurrencyData = new Array<CryptoCurrencyData>();
    this.portfolio = new Array<PortfolioCryptoCurrencyData>();
    this.marketDataService
      .getMarketData(this.currency)
      .subscribe(data => {
        this.cryptoCurrencyData = data;
        this.loading = false;
        this.update();
      });
  }

  update() {
    if (this.amount > 0
      && this.count > 0
      && this.currency) {
      const currencies = this.cryptoCurrencyData
        .slice(0, this.count);
      const currenciesCap = currencies
        .map(c => this.getMarketCap(c, this.currency))
        .reduce((accumulator, cap) => Number(accumulator) + Number(cap));
      this.portfolio = currencies
        .map(c => {
          const portfolioValuePercent = this.getMarketCap(c, this.currency) / currenciesCap;
          const portfolioValue = portfolioValuePercent * this.amount;
          const portfolioCryptoCurrencyData = new PortfolioCryptoCurrencyData(c);
          portfolioCryptoCurrencyData.portfolioValue = portfolioValue;
          portfolioCryptoCurrencyData.portfolioValuePercent = portfolioValuePercent;
          return portfolioCryptoCurrencyData;
        });
    }
  }

  getMarketCap(cryptoCurrencyData: CryptoCurrencyData, currency: string): number {
    const marketCap = cryptoCurrencyData['market_cap_' + currency.toLowerCase()];
    return marketCap;
  }

  removeExcludedCryptoCurrencySymbol(cryptoCurrencySymbol: string) {
    const index = this.excludedCryptoCurrencySymbols.indexOf(cryptoCurrencySymbol);

    if (index >= 0) {
      this.excludedCryptoCurrencySymbols.splice(index, 1);
    }
  }

  addExcludedCryptoCurrenciesSymol(cryptoCurrencySymbol: string) {
    const index = this.excludedCryptoCurrencySymbols.indexOf(cryptoCurrencySymbol);

    if (index >= 0) {
      this.excludedCryptoCurrencySymbols.splice(index, 1);
    }
  }
}
