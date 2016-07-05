var express = require('express');
var twit = require('twitter');
var config = require('./config.js');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var twitter = new twit(config);


var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(express.static('public'));


var server = app.listen(3000);

/*
*Using twitter api to retrieve tweets
*/

var URL = encodeURIComponent("#realestate");


twitter.get("https://api.twitter.com/1.1/search/tweets.json?q=" + URL + "&src=typd", function(err, res) {
  console.log(res);
});