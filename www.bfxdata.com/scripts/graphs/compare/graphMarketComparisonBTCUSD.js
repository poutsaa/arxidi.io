
var graphBtcPriceSwap; // global


$(function () {

$.getJSON('../json/lastTradesBTCUSD.json', function (bitfinex) {
        $.getJSON('../json/lastTradesBitstampBTCUSD.json', function (bitstamp) {
            $.getJSON('../json/lastTradesBtceBTCUSD.json', function (btce) {


                Highcharts.setOptions({
                    global: {
                        useUTC: true
                    }
                });



                // create the chart
                graphBtcPriceSwapOfferDemandUsd = new Highcharts.StockChart({
                    chart: {
                        renderTo: 'graphMarketComparisonBTC',
                        spacingTop: 40,
                        //events: {
                        //    load: requestData
                        //}

                        //alignTicks: false
                    },



                    title: {
                        text: 'BTCUSD price compared for Bitfinex / Btistamp / BTC-e',
                        y: -25,
						style : {
							display: 'none' 
						}                        
                    },

					scrollbar: {
						enabled: false
					},

                    rangeSelector: {
                        inputPosition: {
                            y: 0,
                            x:-120,
                        },
                        buttons: [{
                            type: 'hour',
                            count: 1,
                            text: '1h'
                        }, {
                            type: 'hour',
                            count: 6,
                            text: '6h'
                        }, {
                            type: 'hour',
                            count: 12,
                            text: '12h'
                        }, {
                            type: 'hour',
                            count: 24,
                            text: '24h'
                        }, {
                            type: 'day',
                            count: 3,
                            text: '3d'
                        }, {
                            type: 'day',
                            count: 7,
                            text: '7d'
                        },{
                            type: 'month',
                            count: 1,
                            text: '1m'
                        },{
                            type: 'month',
                            count: 3,
                            text: '3m'
                        },{
                            type: 'month',
                            count: 6,
                            text: '6m'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        selected: 3
                    },

                    xAxis: {
                        //tickInterval: 0.5,
                        //type: 'datetime',
                        //lineWidth: 2,
                        gridLineWidth: 1,
                        //minorTickInterval: 'auto',
                        //minorTickColor: '#FEFEFE',
                        title: {
                            enabled: true,
                            text: 'Time',
                            style: {
                                fontWeight: 'normal'
                            }
                        }
                    },


                    yAxis: [{
           		 			//tickInterval: 500,
           		 			minorTickInterval: 'auto',
		            		minorTickColor: '#FEFEFE',
		            		gridLineWidth: 1,
		            		labels: {
            	    			align: 'left'
            				},
		            		title: {
                				enabled: true,
                				text: 'BTCUSD price',
                				style: {
                    			fontWeight: 'normal',
                    			color: 'midnightblue'

                				}
            				},
            				opposite: true
            				
        				}],

	        plotOptions: {
	            series: {
		        	animation: false,
    	            lineWidth: 1,
    	            marker: {
	    				enabled: false	
	    			}    	            
    	        }
        	},


                    legend: {
                        enabled: true,
                        align: 'left',
                        backgroundColor: '#FFFFFF',
                        borderColor: 'black',
                        borderWidth: 0,
                        floating: true,
                        layout: 'vertical',
                        verticalAlign: 'top',
                        align: 'center',
                        x: 35,
                        y: -35,
                        itemStyle: {
                           fontWeight: '300',
                           color: 'rgb(95,94,98)'
                        }
                        
                        //shadow: true
                    },



                    tooltip: {
                        //positioner: function () {
                        //    return {
                        //       x: 60,
                        //       y: 120
                        //''   };
                        //},
                        backgroundColor: '#FFFFFF',
                        borderColor: 'black',
                        borderWidth: 1,

                        valueDecimals: 4,
                        valuePrefix: '$ ',
                        valueSuffix: ' USD'
                    },

                    series: [{
                        //type : 'candlestick',
                        name: 'Bitfinex BTCUSD',
                        data: bitfinex,
						yAxis: 0,
                        color: 'MidnightBlue',
                        //visible: false,
                        dataGrouping: {
                    approximation: "high",
					units : [
					['minute',
						[1, 5, 10, 15, 30]
					], ['hour', // unit name
						[1, 3, 6, 12, 24] // allowed multiples
					], [
						'day', 
						[1, 2, 3, 7]]
					]
				}
                    },{
                        //type : 'candlestick',
                        name: 'Bitstamp BTCUSD',
                        data: bitstamp,
						yAxis: 0,
                        color: 'green',
                        //visible: false,
                        dataGrouping: {
                    approximation: "high",
					units : [
					['minute',
						[1, 5, 10, 15, 30]
					], ['hour', // unit name
						[1, 3, 6, 12, 24] // allowed multiples
					], [
						'day', 
						[1, 2, 3, 7]]
					]
				}
                    }, {
                        //type : 'candlestick',
                        name: 'BTCE BTCUSD',
                        data: btce,
						yAxis: 0,
                        color: 'red',
                        //visible: false,
                        dataGrouping: {
                    approximation: "high",
					units : [
					['minute',
						[1, 5, 10, 15, 30]
					], ['hour', // unit name
						[1, 3, 6, 12, 24] // allowed multiples
					], [
						'day', 
						[1, 2, 3, 7]]
					]
				}
                    }]



                });




            });
        });
    });
});	