var express = require('express');
var twit = require('twitter');
var config = require('./config.js');
var helper = require('./helpers.js');
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
var tweetStorage = [{id: 0}];
var theLastTweet = tweetStorage[tweetStorage.length - 1].id;

twitter.get("https://api.twitter.com/1.1/search/tweets.json?q=" + URL + "&since_id=" + theLastTweet + "&count=100&src=typd", function(err1, res1) {
  tweetStorage.push(res1.statuses);
  console.log("the first query is pushed");
  console.log(Object.keys(res1));
  twitter.get("https://api.twitter.com/1.1/search/tweets.json" + res1.search_metadata.next_results + "&src=typd", function(err2, res2){
    tweetStorage.push(res2.statuses);
    console.log("the second query is pushed");
    console.log(Object.keys(res2));
    twitter.get("https://api.twitter.com/1.1/search/tweets.json" + res2.search_metadata.next_results + "&src=typd", function(err3, res3){
      tweetStorage.push(res3.statuses);
      console.log("the third query is pushed");
      console.log(Object.keys(res3));
      twitter.get("https://api.twitter.com/1.1/search/tweets.json" + res3.search_metadata.next_results + "&src=typd", function(err4, res4){
        tweetStorage.push(res4.statuses);
        console.log("the fourth query is pushed");
        console.log(Object.keys(res4));
        twitter.get("https://api.twitter.com/1.1/search/tweets.json" + res4.search_metadata.next_results + "&src=typd", function(err5,res5) {
          tweetStorage.push(res5.statuses);
          console.log("the fifth query is pushed");
          console.log(Object.keys(res5));
          console.log("Here is how many status you can search ^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%^%" + tweetStorage.length);
        });
      });
    });
  });
});










