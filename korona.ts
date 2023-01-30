import request from 'request';

export class KoronaPay {
    public url = 'https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=TUR&receivingCurrencyId=949&paymentMethod=debitCard&receivingAmount=1000000&receivingMethod=cash&paidNotificationEnabled=false';
    public data: any;

    public getData(): Promise<void> {
        return new Promise((resolve, reject) => {
            request(this.url, (error: Error, _: any, body: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                
                this.data = JSON.parse(body);
                resolve();
            });
        });
    }
}