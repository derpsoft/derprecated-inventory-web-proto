var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');

app.use(history());

app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 3000));

console.log(__dirname + '/dist');

app.listen(app.get('port'), function() {
  console.log(`ENV: ${process.env.NODE_ENV}`);
  console.log(`Derp is running at localhost: ${app.get('port')}`);
});
