import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../market-data.service';
import { CryptoCurrencyData } from '../models/crypto-currency.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Array<CryptoCurrencyData>;
  amount: 1000;
  count: 10;
  currency = 'usd';
  portfolio: Array<any>;

  constructor(private readonly marketDataService: MarketDataService) { }

  ngOnInit() {
    this.marketDataService
      .getMarketData(10, 'EUR')
      .subscribe(data => {
        this.data = data;
        this.update();
      });
  }

  update() {
    if (this.amount > 0
      && this.count > 0) {
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
