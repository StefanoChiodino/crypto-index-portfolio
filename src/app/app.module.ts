import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarketDataService } from './market-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { SupportedCurrencyService } from './supported-currency.service';
import {
  MatSelectModule, MatInputModule, MatFormFieldModule, MatListModule, MatProgressBarModule, MatChipsModule, MatIconModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [
    MarketDataService,
    HttpClient,
    SupportedCurrencyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
