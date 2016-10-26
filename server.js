var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');

var hist = history({
  rewrites: [
    { from: /\*/, to: '/index.html'}
  ]
});

app.use(express.static(__dirname + '/dist'));
app.use(hist);
app.listen(process.env.PORT || 3000);
