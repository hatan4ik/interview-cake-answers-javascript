/**
 * Created by ptdecker on 2015-01-22
 */

/**
 * Problem Statement (from Interview Cake, http://www.interviewcake.com)
 *
 * Writing interview questions hasn't made me rich. Maybe trading Apple stocks will.
 *
 * I have an array stockPricesYesterday where:
 *
 * The indices are the time, as a number of minutes past trade opening time, which was 9:30am local time.
 *
 * The values are the price of Apple stock at that time, in dollars.
 *
 * For example, the stock cost $500 at 10:30am, so stockPricesYesterday[60] = 500.
 *
 * Write an efficient algorithm for computing the best profit I could have made from 1 purchase and 1 sale of 1
 * Apple stock yesterday. For this problem, we won't allow "shorting"—you must buy before you sell.
 */

"use strict";

var prices = [{
        date: '2015-01-21',
        data: [[0, 10748], [ 5, 10751], [ 10, 10750], [ 15, 10694], [ 20, 10695], [ 25, 10738], [ 30, 10726],
            [ 35, 10751], [ 40, 10749], [ 45, 10694], [ 50, 10728], [ 55, 10722], [ 60, 10714], [ 65, 10696],
            [ 70, 10692], [ 75, 10708], [ 80, 10693], [ 85, 10669], [ 90, 10670], [ 95, 10704], [100, 10703],
            [105, 10711], [110, 10725], [115, 10716], [120, 10711], [125, 10708], [130, 10691], [135, 10682],
            [140, 10697], [145, 10706], [150, 10701], [155, 10726], [160, 10722], [165, 10727], [170, 10725],
            [175, 10725], [180, 10719], [185, 10725], [190, 10736], [195, 10738], [200, 10735], [205, 10753],
            [210, 10754], [215, 10727], [220, 10728], [225, 10742], [230, 10754], [235, 10767], [240, 10764],
            [245, 10764], [250, 10759], [255, 10763], [260, 10765], [265, 10768], [270, 10785], [275, 10787],
            [280, 10785], [285, 10788], [290, 10797], [295, 10784], [300, 10805], [305, 10814], [310, 10836],
            [315, 10835], [320, 10832], [325, 10849], [330, 10858], [335, 10862], [340, 10861], [345, 10866],
            [350, 10854], [355, 10853], [360, 10844], [365, 10847], [370, 10864], [375, 10861], [380, 10860],
            [385, 10871], [390, 10845]]
    }, {
        date: '2015-01-21',
        data: [[0, 10879], [30, 10902], [ 60, 10999], [ 90, 11084], [120, 11074], [150, 11056], [180, 11042],
            [210, 10996], [240, 10982], [270, 10941], [300, 10982], [330, 11010], [360, 10980], [390, 10955]]
    }, {
        date: '2015-01-22',
        data: [[0, 11032], [30, 11016], [ 60, 11045], [ 90, 11124], [120, 11147], [150, 11156], [180, 11161],
            [210, 11130], [240, 11118], [270, 11148], [300, 11161], [330, 11190], [360, 11213], [390, 11239]]
    }, {
        date: '2015-01-23',
        data: [[0, 11213], [ 5, 11120], [ 10, 11183], [ 15, 11166], [ 20, 11200], [ 25, 11230], [ 30, 11265],
            [ 35, 11236], [ 40, 11224], [ 45, 11209], [ 50, 11228], [ 55, 11227], [ 60, 11226], [ 65, 11220],
            [ 70, 11208], [ 75, 11187], [ 80, 11194], [ 85, 11212], [ 90, 11210], [ 95, 11220], [100, 11207],
            [105, 11210], [110, 11224], [115, 11228], [120, 11242], [125, 11248], [130, 11242], [135, 11266],
            [140, 11272], [145, 11273], [150, 11280], [155, 11288], [160, 11270], [165, 11280], [170, 11268],
            [175, 11264], [180, 11257], [185, 11266], [190, 11282], [195, 11280], [200, 11283], [205, 11294],
            [210, 11296], [215, 11289], [220, 11293], [225, 11314], [230, 11305], [235, 11327], [240, 11327],
            [245, 11336], [250, 11333], [255, 11355], [260, 11372], [265, 11374], [270, 11362], [275, 11371],
            [280, 11347], [285, 11324], [290, 11320], [295, 11335], [300, 11337], [305, 11344], [310, 11340],
            [315, 11338], [320, 11304], [325, 11316], [330, 11311], [335, 11300], [340, 11289], [345, 11299],
            [350, 11297], [355, 11300], [360, 11300], [365, 11298], [370, 11295], [375, 11296], [380, 11298],
            [385, 11293], [390, 11299]]
    }, {
    date: 'always up',
    data: [[0, 1], [1, 2], [2, 3], [3, 4]]
}, {
    date: 'always down',
    data: [[0, 4], [1, 3], [2, 2], [3, 1]]
}, {
    date: 'big swing following small swing',
    data: [[0, 100], [1, 200], [2, 300], [4, 200], [5, 100], [6, 50], [7, 200], [8, 500]]
}, {
    date: 'up high but ending lower then prior low',
    data: [[0, 100], [1, 200], [2, 300], [4, 200], [5, 100], [6, 50]]
}];


function getBestSpread(data) {

    var bestSpread = {
            low: data[0],
            high: data[0],
            amount: 0
        },
        i,
        currentPrice;

    for (i = 1; i < data.length; i += 1) {

        currentPrice = data[i][1];
        if (currentPrice < bestSpread.low[1]) {
            bestSpread.low = data[i];
        }
        if (currentPrice > bestSpread.high[1]) {
            bestSpread.high = data[i];
        }

    }
    bestSpread.amount = bestSpread.high[1] - bestSpread.low[1];

    return bestSpread;
}


function getBestSpreadParker(data) {

    var minPrice = data[0][1],
        maxProfit = 0,
        currentPrice,
        time;

    for (time = 0; time < data.length; time += 1) {
        currentPrice = data[time][1];
        minPrice = Math.min(minPrice, currentPrice);
        maxProfit = Math.max(maxProfit, currentPrice - minPrice);
    }

    return maxProfit;
}

// Run the scenarios

console.log("My Approach");
var i;
for (i = 0; i < prices.length; i += 1) {
    console.log(prices[i].date, getBestSpread(prices[i].data));
}

console.log("\nParker's Approach");
var i;
for (i = 0; i < prices.length; i += 1) {
    console.log(prices[i].date, getBestSpreadParker(prices[i].data));
}