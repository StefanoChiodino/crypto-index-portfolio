import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarketDataService } from './market-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { SupportedCurrencyService } from './supported-currency.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    MarketDataService,
    HttpClient,
    SupportedCurrencyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
