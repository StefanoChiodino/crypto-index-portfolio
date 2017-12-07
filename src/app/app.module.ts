import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  providers: [
    MarketDataService,
    HttpClient,
    SupportedCurrencyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
