var moment = require('moment-timezone');
moment.tz.setDefault("America/Monterrey");
var seconds = 1612986687
var seconds2 = 1612986937
var mili = seconds * 1000
let days = ["Sun", 'Mon', 'Tues', 'Wed', "Thurs", "Fri", "Sat"]
//sample variables
let e_duration = seconds2 - seconds
console.log(moment(mili).format('MM DD YY'))
let e_start_12h = moment(mili).format('hh:mm:ss a')
let e_start_24h = moment(mili).format('HH:mm:ss ')
let e_weekday = days[moment(mili).weekday()]
let e_month = moment(mili).month()+1
let e_day_of_month = moment(mili).date()



let e_year = moment(mili).year()
console.log(e_duration, e_start_12h, e_start_24h,e_weekday, e_month, e_day_of_month, e_year)