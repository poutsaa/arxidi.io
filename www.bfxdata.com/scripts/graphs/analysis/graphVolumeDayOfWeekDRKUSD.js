var graphVolumeDaayOfWeekDRKUSD; // global
		

$(function() {
     $.getJSON('../../json/volumeDayOfWeekDRKUSD.json', function (data) {

					Highcharts.setOptions({
						global: {
							useUTC: true
						}
					});
					// create the chart
				graphVolumeDaayOfWeekDRKUSD = new Highcharts.Chart({
					chart: {
						renderTo: 'volumeDayOfWeekChartDRKUSD',
						type: 'column',
						animation: false,
						marginBottom:130						
					},

    


                	
        			title: {
							text: 'graphVolumeDayOfWeekTCUSD',
							style: {
								display: 'none'
								}            		
							},
            		
            		
           		 	xAxis: {
           		 	
					  type: 'category',
						labels: {
							rotation: -60,
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif'
							}
						},           		 	
					
           		 		//tickInterval: 5,
		            	gridLineWidth: 1,
		            	minorTickInterval: 'auto',
		            	minorTickColor: '#FEFEFE',
		            	title: {
                			enabled: true,
                			text: 'Day of the Week',
                			style: {
                    		fontWeight: 'normal',
// 							display: 'none'                    		
                			}
            			}
        			},

           		 	yAxis: {
           		 		//tickInterval: 250,
           		 		minorTickInterval: 'auto',
		            	minorTickColor: '#FEFEFE',
		            	title: {
                			enabled: true,
                			text: 'Volume Sum',
                			style: {
                    		fontWeight: 'normal',
// 							display: 'none'                    		
                			}
            			}
        			},

        			legend: {
			            align: 'center',
            			verticalAlign: 'top',
            			y: 10,
            			floating: true,
            			backgroundColor: '#FFFFFF',
            			enabled: false
        			},
                    
            		plotOptions: {
                		series: {
                			lineWidth: 1,
                			animation: false,
                    		marker: {
                    			enabled: false
               				}
                		}
            		},
// 					tooltip: {
// 					    crosshairs: [true,true]
// 					},
                    series: [{
    					name: 'Volume Per Day',
    					data: data,
						dataLabels: {
							enabled: true,
							rotation: -90,
							color: '#FFFFFF',
							align: 'right',
							x: 4,
							y: 10,
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif',
								textShadow: '0 0 3px black'
							}
						},    					
//     					color: 'rgba(0,0,0,0.4)',
//     					fillColor: 'rgba(90,151,112,0.2)'
    				}]
                });
            });
        });
