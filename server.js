var express = require('express');
var app = express();
var history = require('connect-history-api-fallback');

app.use(express.static(__dirname + '/dist'));
app.use(history());

app.listen(process.env.PORT || 3000);
