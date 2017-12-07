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
  amount: number;
  count: number;

  constructor(private readonly marketDataService: MarketDataService) { }

  ngOnInit() {
    this.marketDataService
      .getMarketData(10, "EUR")
      .subscribe(data => this.data = data);
  }

  update() {

  }
}
