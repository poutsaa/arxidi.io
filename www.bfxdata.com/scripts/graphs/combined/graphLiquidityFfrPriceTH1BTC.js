		var graphBtcPriceSwapFfr; // global

// 		function requestData() {
// 			$.ajax({
// 				url: 'json/tickLendOfferTH1.json', 
// 				success: function(point) {
// 					var series = chart.series[0],
// 						shift = series.data.length > 1; // shift if the series is longer than 1
// 		
// 					// add the point
// 					chart.series[0].addPoint(eval(point), true, shift);
// 					
// 					// call it again after one second
// 					setTimeout(requestData, 60000);	
// 				},
// 				cache: false
// 			});
// 		}

$(function() {
$.getJSON('../json/lastTradesTH1BTC.json', function (TH1BTC) {
    $.getJSON('../json/totalLendsRateTH1Month.json', function (totalLendsRateTH1JSON) {


	    Highcharts.setOptions({
        	global: {
            	useUTC: false
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
        var groupingUnits = [[
            'minute',                         // unit name
            [1/*,5,15,30*/]                             // allowed multiples
        ]/*, [
            'hour',
            [1, 2, 3, 4, 6]
        ]*/];

        // create the chart
        graphBtcPriceSwapFfr = new Highcharts.StockChart({
            chart: {
                spacingTop: 40,
                renderTo: 'graphBtcPriceSwapFfr'//,
                //events: {
				//		load: requestData
				//	}
                
                //alignTicks: false
            },


			



			title : {
			     y: -25,
				text : 'TH1BTC Price combined with Average Rate (=FRR) TH1 Swaps',
				style : {
					display: 'none' 
				}
			},

                    legend: {
                        enabled: true,
                        align: 'left',
                        //backgroundColor: '#FFFFFF',
                        borderColor: 'black',
                        borderWidth: 0,
                        floating: true,
                        layout: 'vertical',
                        verticalAlign: 'top',
                        align: 'center',
                        x: 35,
                        y: -35,
                        //shadow: true
                        itemStyle: {
                           fontWeight: '300',
                           color: 'rgb(95,94,98)'
                        }
                    },			

					scrollbar: {
						enabled: false
					},

		    rangeSelector: {
		        inputPosition: {
		            y: 0,
		            x: -120
		        },
				buttons: [{
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
				}, {
					type: 'week',
					count: 2,
					text: '14d'
				}, {
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'month',
					count: 6,
					text: '6m'
				}, {
					type: 'all',
					text: 'All'
				}],		    	
		        selected: 2
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
                                text: 'Average Rate (FRR) per day on active TH1 Swaps',
                                style: {
                                    fontWeight: 'normal',
                                    color: 'darkgreen'
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

  
        tooltip: {
            valueDecimals: 4 //,
            //valuePrefix: '$',
            //valueSuffix: ' %'
        },  

			series : [{
				//type : 'candlestick',
				name : 'TH1BTC price',
				data : TH1BTC,
				yAxis: 1,
				color: 'midnightblue',

				dataGrouping : {
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
                name : 'Average Rate per day (FRR) on Active TH1 Swaps',
                data : totalLendsRateTH1JSON,
                yAxis: 0,
                color: 'darkgreen',
				dataGrouping : {
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
