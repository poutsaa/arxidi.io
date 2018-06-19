		var chartLiquiditySumBtcPriceCombined; // global

// 		function requestData() {
// 			$.ajax({
// 				url: 'json/tickLendOfferUSD.json', 
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
            $.getJSON('../json/totalLendsAmountTH1Month.json', function (totalLendsAmountTH1JSON) {


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
        chartLiquiditySumBtcPriceCombined = new Highcharts.StockChart({
            chart: {
                spacingTop: 40,
                renderTo: 'graphLiquiditySumBtcPriceCombined'//,
                //events: {
				//		load: requestData
				//	}
                
                //alignTicks: false
            },


			



			title : {
			     y: -25,
				text : 'TH1BTC Price combined with total sum of active TH1 swaps',
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
                        itemStyle: {
                           fontWeight: '300',
                           color: 'rgb(95,94,98)'
                        }

                        //shadow: true
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
                				text: 'Total sum of active TH1 swaps',
                				style: {
                    			fontWeight: 'normal',
                    			color: 'Crimson'

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
                    			color: 'MidnightBlue'

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
				color: 'MidnightBlue',

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
			
			}, {
				//type : 'candlestick',
				name : 'Total sum of active Swaps TH1',
				data : totalLendsAmountTH1JSON,
				yAxis: 0,
				color: 'Crimson',

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
//});
//});
//});
//});
});
