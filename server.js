var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 3000))

console.log(__dirname + '/dist');

app.listen(app.get('port'), function() {
  console.log("Derp is running at localhost:" + app.get('port'))
})
