
var graphBtcPriceSwap; // global



$(function () {

// $.getJSON('../json/vwapHourlyTH1BTC.json', function (price) {
$.getJSON('../json/lastTradesTH1BTC.json', function (price) {
        $.getJSON('../json/lastLendOffersTH1.json', function (offers) {
            $.getJSON('../json/lastLendDemandsTH1.json', function (demands) {


                Highcharts.setOptions({
                    global: {
                        useUTC: true
                    }
                });


                /*
        // split the data set into ohlc and volume
        var ohlc = [],
            volume = [],
            dataLength = data.length;
            
        for (i = 0; i < dataLength; i++) {
            ohlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4] // close
            ]);
            
            volume.push([
                data[i][0], // the date
                data[i][5] // the volume
            ])
        }
			*/
                // set the allowed units for data grouping
                var groupingUnits = [
                    [
                        'minute', // unit name
                        [1 /*,5,15,30*/ ] // allowed multiples
                    ]
                    /*, [
            'hour',
            [1, 2, 3, 4, 6]
        ]*/
                ];

                // create the chart
                graphBtcPriceSwapOfferDemandUsd = new Highcharts.StockChart({
                    chart: {
                        renderTo: 'graphBtcPriceSwapOfferDemandUsd',
                        spacingTop: 40,
                        //events: {
                        //    load: requestData
                        //}

                        //alignTicks: false
                    },



                    title: {
                        text: 'Bitfinex TH1BTC price / Swap Offers and Demand (% per day)',
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
                	text: 'Time (UTC)',
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
                                text: 'Rate per day TH1 Highest Demand',
                                style: {
                                    fontWeight: 'normal',
                                    color: 'Crimson'
                                    //color: '#2f7ed8'

                                }
                            },
            				opposite: true                                
                            },{
                            //tickInterval: 500,
                            minorTickInterval: 'auto',
                            minorTickColor: '#FEFEFE',
                            gridLineWidth: 1,
                            labels: {
                                align: 'left'
                            },
                            title: {
                                enabled: true,
                                text: 'Rate per day TH1 Lowest Offer',
                                style: {
                                    fontWeight: 'normal',
                                    color: 'darkgreen'
                                    //color: '#2f7ed8'

                                }
                            },
            				opposite: true
                            
                            }, {
           		 			//tickInterval: 500,
           		 			minorTickInterval: 'auto',
		            		minorTickColor: '#FEFEFE',
		            		gridLineWidth: 1,
		            		labels: {
            	    			align: 'right'
            				},
		            		title: {
                				enabled: true,
                				text: 'TH1BTC price',
                				style: {
                    			fontWeight: 'normal',
                    			color: 'midnightblue'

                				}
            				},
            				opposite: false
            				
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

                        valueDecimals: 5,
                        //valuePrefix: '$',
                        valueSuffix: ' %'
                    },

                    series: [{
                        //type : 'candlestick',
                        name: 'Price TH1BTC',
                        data: price,
						yAxis: 2,
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
                        name: 'Lowest TH1 Swap Offer',
						yAxis: 0,                        
                        data: offers,
                        color: 'darkgreen',
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
                        name: 'Highest TH1 Swap Demand',
                        data: demands,
						yAxis: 0,                        
                        color: 'rgba(150,0,0,1.0)',
                        visible: true,
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