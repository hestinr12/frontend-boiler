var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 8000);
