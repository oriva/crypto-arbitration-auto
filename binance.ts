import request from 'request';

export class Binance {
    public asset: string;
    public fiat: string;
    public tradeType: string;
    public transAmount: string;
    public payTypes: string[];
    public options: any;
    public data: any;

    constructor (asset: string, fiat: string, tradeType: string, payTypes: string[], transAmount?: string) {
        this.asset = asset;
        this.fiat = fiat;
        this.tradeType = tradeType;
        this.transAmount = transAmount || "";
        this.makeOption();
    }

    public getData(): Promise<void> {
        return new Promise((resolve, reject) => {
            request(this.options, (error: Error, _: any, body: any) => {
                if (error) {
                    console.error(`Ошибка получения данных при входных [${this.asset}, ${this.fiat}, ${this.tradeType}, ${this.transAmount}]`);
                    reject(error);
                    return;
                }
                this.data = JSON.parse(body).data;
                resolve();
            });
        });
    }

    private makeOption() {
        this.options = {
            method: 'POST',
            url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "proMerchantAds": false,
                "page": 1,
                "rows": 10,
                "countries": [],
                "publisherType": null,
                "asset": this.asset,
                "fiat": this.fiat,
                "tradeType": this.tradeType,
                "payTypes": this.payTypes,
                "transAmount": this.transAmount
            })
        }
    }

    public getMinPrice() {
        return this.data.reduce(function(prev, current) {
            return (prev.adv.price < current.adv.price) ? prev : current;
        });
    }

    public getMaxPrice() {
        return this.data.reduce(function(prev, current) {
            return (prev.adv.price > current.adv.price) ? prev : current;
        });
    }
}