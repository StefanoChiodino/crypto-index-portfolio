import { Pipe, PipeTransform } from '@angular/core';
import { CryptoCurrencyData } from './models/crypto-currency.data';

@Pipe({
  name: 'coinMarketCapImage'
})
export class CoinMarketCapImagePipe implements PipeTransform {

  transform(value: CryptoCurrencyData, size: number = 64): any {
    const imageUrl = `https://files.coinmarketcap.com/static/img/coins/64x64/${value.name.toLowerCase().replace(' ', '-')}.png`;
    return imageUrl;
  }
}
