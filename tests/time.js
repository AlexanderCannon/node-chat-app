var moment = require('moment');

var date = moment(1111).valueOf()
// date.add(47, 'year');
console.log(date);

var date = moment();
console.log(date.format('HH:mm'))