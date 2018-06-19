function formatNumber(number, decimals)  ///// number formatter
{
    number = number.toFixed(decimals) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
//     var month = months[a.getMonth() - 1];
     var month = a.getMonth();
     var date = a.getDate();
     var hour = a.getHours();
     if (hour<10)
     {
     	hour = "0"+hour;
     } 
     var min = a.getMinutes();
     if (min<10)
     {
     	min = "0"+min;
     }    
     var sec = a.getSeconds();
     if (sec<10)
     {
     	sec = "0"+sec;
     }
// 08:14:21 26-09-2014
     var time = hour + ':' + min + ':' + sec + ' ' +date + '-' + month + '-' + year;
     return time;
 }