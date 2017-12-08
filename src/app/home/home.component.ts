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
  excludedCryptoCurrencySymbols: Array<string> = ['eg'];

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
      const cryptoCurrencies = this.cryptoCurrencyData
        .filter(c => !this.excludedCryptoCurrencySymbols.includes(c.symbol))
        .slice(0, this.count);
      const currenciesCap = cryptoCurrencies
        .map(c => this.getMarketCap(c, this.currency))
        .reduce((accumulator, cap) => Number(accumulator) + Number(cap));
      this.portfolio = cryptoCurrencies
        .map(c => {
          const portfolioValueRatio = this.getMarketCap(c, this.currency) / currenciesCap;
          const portfolioValue = portfolioValueRatio * this.amount;
          const portfolioCryptoCurrencyData = new PortfolioCryptoCurrencyData(c);
          portfolioCryptoCurrencyData.portfolioValue = portfolioValue;
          portfolioCryptoCurrencyData.portfolioValueRatio = portfolioValueRatio;
          return portfolioCryptoCurrencyData;
        });
    }
  }

  getMarketCap(cryptoCurrencyData: CryptoCurrencyData, currency: string): number {
    const marketCap = cryptoCurrencyData['market_cap_' + currency.toLowerCase()];
    return marketCap;
  }

  removeExcludedCryptoCurrenciesSymbol(cryptoCurrencySymbol: string) {
    const index = this.excludedCryptoCurrencySymbols.indexOf(cryptoCurrencySymbol);

    if (index >= 0) {
      this.excludedCryptoCurrencySymbols.splice(index, 1);
      this.update();
    }
  }

  addExcludedCryptoCurrenciesSymol(cryptoCurrencySymbol: string) {
    if (!this.excludedCryptoCurrencySymbols.includes(cryptoCurrencySymbol)) {
      this.excludedCryptoCurrencySymbols.push(cryptoCurrencySymbol);
      this.update();
    }
  }
}
