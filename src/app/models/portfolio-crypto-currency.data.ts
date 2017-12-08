import { CryptoCurrencyData } from './crypto-currency.data';

export class PortfolioCryptoCurrencyData extends CryptoCurrencyData {
    portfolioValue: number;
    portfolioValueRatio: number;
    portfolioAmount: number;
    image: string;

    public constructor(init?: Partial<PortfolioCryptoCurrencyData>) {
        super();
        Object.assign(this, init);
    }
}
