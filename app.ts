import request from 'request';
import { Binance } from './binance';
import { KoronaPay } from './korona';
import { load } from 'cheerio';

import { googleSheets } from './table';

const RUBLE_AMOUNT = "6000";
const TRY_AMOUNT = String(6000/3.7);

const usdtRybB = new Binance("USDT", "RUB", "BUY", ["TinkoffNew"], RUBLE_AMOUNT);
const usdtTryS = new Binance("USDT", "TRY", "SELL", ["VakifBank"], TRY_AMOUNT);
const btcRubB = new Binance("BTC", "RUB", "BUY", ["TinkoffNew"], RUBLE_AMOUNT);
const btcTryS = new Binance("BTC", "TRY", "SELL", ["VakifBank"], TRY_AMOUNT);
const busdRubB = new Binance("BUSD", "RUB", "BUY", ["TinkoffNew"], RUBLE_AMOUNT);
const busdTryS = new Binance("BUSD", "TRY", "SELL", ["VakifBank"], TRY_AMOUNT);
const bnbRubB = new Binance("BNB", "RUB", "BUY", ["TinkoffNew"], RUBLE_AMOUNT);
const bnbTryS = new Binance("BNB", "TRY", "SELL", ["VakifBank"], TRY_AMOUNT);
const koronaTry = new KoronaPay();

const allBinance = [usdtRybB, usdtTryS, btcRubB, btcTryS, busdRubB, busdTryS, bnbRubB, bnbTryS, koronaTry];

const usdt = async () => {
    await usdtRybB.getData();
    await usdtTryS.getData();
    console.log('getData');   
}

const requests = allBinance.map(url => {
    return url.getData();
});

Promise.all(requests).then(() => {
    console.log(usdtRybB.getMinPrice().adv.price);
    console.log(usdtTryS.getMaxPrice().adv.price);
    
    console.log('USDT: ' + (usdtRybB.getMinPrice().adv.price / usdtTryS.getMaxPrice().adv.price).toFixed(2));
    console.log('BTC: ' + (btcRubB.getMinPrice().adv.price / btcTryS.getMaxPrice().adv.price).toFixed(2));
    console.log('BUSD: ' + (busdRubB.getMinPrice().adv.price / busdTryS.getMaxPrice().adv.price).toFixed(2));
    console.log('BNB: ' + (bnbRubB.getMinPrice().adv.price / bnbTryS.getMaxPrice().adv.price).toFixed(2));
    console.log('Korona: ' + koronaTry.data[0].exchangeRate.toFixed(2));
});



// const options = (asset = "USDT", fiat = "TRY", tradeType = "SELL", transAmount = "20000") => {
//     const option = {
//         method: 'POST',
//         url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             "proMerchantAds": false,
//             "page": 1,
//             "rows": 10,
//             "payTypes": [],
//             "countries": [],
//             "publisherType": null,
//             "asset": asset,
//             "fiat": fiat,
//             "tradeType": tradeType,
//             "transAmount": transAmount
//         })
//     }

//     return option;
// };

// request(options("USDT", "RUB", "BUY", RUBLE_AMOUNT), (error, _, body) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     const site = JSON.parse(body).data;
    
//     const minrubSaler = site.reduce(function(prev, current) {
//         return (prev.adv.sum < current.adv.sum) ? prev : current;
//     });

//     console.log(`Минимальная сумма: ${minrubSaler.adv.price}; Nick: ${minrubSaler.advertiser.nickName}`);

//     request(options("USDT", "TRY", "SELL", ""), (error, _, body) => {
//         const maxTryBuyer = JSON.parse(body).data.reduce(function(prev, current) {
//             return (prev.adv.sum > current.adv.sum) ? prev : current;
//         });

//         console.log(`USDT. Стоимость продажи: ${maxTryBuyer.adv.price};
//         Nick: ${maxTryBuyer.advertiser.nickName};
//         Count liras: ${Number(rubleAmount)/minrubSaler.adv.price*maxTryBuyer.adv.price}`);
//     });
// });

// request(options("BTC", "RUB", "BUY", RUBLE_AMOUNT), (error, _, body) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     const site = JSON.parse(body).data;
    
//     const minrubSaler = site.reduce(function(prev, current) {
//         return (prev.adv.sum < current.adv.sum) ? prev : current;
//     });

//     request(options("BTC", "TRY", "SELL", ""), (error, _, body) => {
//         const maxTryBuyer = JSON.parse(body).data.reduce(function(prev, current) {
//             return (prev.adv.sum > current.adv.sum) ? prev : current;
//         });

//         console.log(`BTC. Стоимость продажи: ${maxTryBuyer.adv.price};
//         Nick: ${maxTryBuyer.advertiser.nickName};
//         Count liras: ${Number(rubleAmount)/minrubSaler.adv.price*maxTryBuyer.adv.price}`);
//     });
// });



// request(options("BUSD", "RUB", "BUY", RUBLE_AMOUNT), (error, _, body) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     const site = JSON.parse(body).data;
    
//     const minrubSaler = site.reduce(function(prev, current) {
//         return (prev.adv.sum < current.adv.sum) ? prev : current;
//     });

//     request(options("BUSD", "TRY", "SELL", ""), (error, _, body) => {
//         const maxTryBuyer = JSON.parse(body).data.reduce(function(prev, current) {
//             return (prev.adv.sum > current.adv.sum) ? prev : current;
//         });

//         console.log(`BTC. Стоимость продажи: ${maxTryBuyer.adv.price};
//         Nick: ${maxTryBuyer.advertiser.nickName};
//         Count liras: ${Number(rubleAmount)/minrubSaler.adv.price*maxTryBuyer.adv.price}`);
//     });
// });

// (async function() {
//     await googleSheets();
// }());
