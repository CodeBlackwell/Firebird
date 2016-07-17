var express = require('express');
var Twit = require('twitter');
var config = require('./config.js');
var helper = require('./helpers.js');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var converter = require('json-2-csv');

var app = express();
var twitter = new Twit(config);


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

var URL = encodeURIComponent('#realEstate');
var tweetStorage = [],
    statusBank = [];

twitter.get('https://api.twitter.com/1.1/search/tweets.json?q=' + URL + '&since_id=0&count=100&src=typd', function(err1, res1) {
  if (err1) { 
    console.log(err1, tweetStorage.length);
    return;
  }
  tweetStorage.push(res1.statuses);
  console.log('the first query is pushed', tweetStorage.length);
  console.log(Object.keys(res1));
  twitter.get('https://api.twitter.com/1.1/search/tweets.json' + res1.search_metadata.next_results + '&since_id=0&src=typd', function(err2, res2) {
    if (err2) {
      console.log(err2, tweetStorage.length);
      return tweetStorage;
    }
    tweetStorage.push(res2.statuses);
    console.log('the second query is pushed', tweetStorage.length);
    console.log(Object.keys(res2));
    twitter.get('https://api.twitter.com/1.1/search/tweets.json' + res2.search_metadata.next_results + '&since_id=0&src=typd', function(err3, res3) {
      if (err3) {
        console.log(err3, tweetStorage.length);
        return tweetStorage;
      }
      tweetStorage.push(res3.statuses);
      console.log('the third query is pushed', tweetStorage.length);
      console.log(Object.keys(res3));
      twitter.get('https://api.twitter.com/1.1/search/tweets.json' + res3.search_metadata.next_results + '&since_id=0&src=typd', function(err4, res4) {
        if (err4) { 
          console.log(err4, tweetStorage.length);
          return tweetStorage;
        }
        tweetStorage.push(res4.statuses);
        console.log('the fourth query is pushed', tweetStorage.length);
        console.log(Object.keys(res4));
        twitter.get('https://api.twitter.com/1.1/search/tweets.json' + res4.search_metadata.next_results + '&since_id=0&src=typd', function(err5, res5) {
          if (err5) { 
            console.log(err5, tweetStorage.length);
            return tweetStorage;
          }
          tweetStorage.push(res5.statuses);
          console.log('the fifth query is pushed');
          console.log(Object.keys(res5), tweetStorage.length);

          for (var i = 0; i < tweetStorage.length; i++) {
            for (var q = 0; q < tweetStorage[i].length; q++) {
              statusBank.push(tweetStorage[i][q]);
            }
          }
          var uniqueTweets = {}
          // console.log(Object.keys(tweetStorage));
          // console.log(Object.keys(tweetStorage[0]));
          // console.log(tweetStorage[0]);
          // console.log(statusBank.length);
          for (var z = 0; z < statusBank.length; z++) {
            statusBank[z]['followed_by'] = statusBank[z]['user']['followers_count'],
            statusBank[z]['friended_by'] = statusBank[z]['user']['friends_count'],
            statusBank[z]['#_of_lists'] = statusBank[z]['user']['listed_count'];
          }
          // console.log(statusBank[0]);
          for (var Q = 0; Q < statusBank.length; Q++) {
            //check to see if the status is retweeted
            if (statusBank[Q]['retweeted_status']) {
              //if so, store the original tweet id and tweet
              if (uniqueTweets['' + statusBank['retweeted_status'].id] ) {
                
              }
              uniqueTweets['' + statusBank['retweeted_status'].id] = 1;
            } else {
              uniqueTweets['']
            }
          }

          fs.writeFileSync('./tweets2.json', JSON.stringify(statusBank), 'utf-8');
          
         
        });
      });
    });
  });
});














