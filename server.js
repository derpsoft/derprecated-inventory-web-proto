var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res) {
  res.send('/');
});

app.listen(process.env.PORT || 3000);
