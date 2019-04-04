'use strict';
 
const Router = require('express');
const request = require("request");
const yahooStockPrices = require('yahoo-stock-prices');
const alphaStockUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=CDAIT2POW6T899RJ&symbol=";

const stockRoute = (app) => {
    const router = new Router();
 
    router
        .get('/yahoo/:id', (req, res) => {
            var sid = req.params.id;
            yahooStockPrices.getCurrentPrice(sid, function(error, price){
                res.send(price.toString());
            });
        })
        .get('/alpha/:id', (req, res) => {
            var sid = req.params.id;
            request(alphaStockUrl + sid, function (error, response, body) { 
                if (!error && response.statusCode == 200) {  
                    var stockData = JSON.parse(body);
                	res.send(stockData['Global Quote']['05. price']);
                }
            });
        });
 
    app.use('/stock', router);
};
 
module.exports = stockRoute;
