/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Debashis Barman (http://www.debashisbarman.in)
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = '';
var TWITTER_CONSUMER_SECRET = '';
var TWITTER_ACCESS_TOKEN = '';
var TWITTER_ACCESS_TOKEN_SECRET = '';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#votefor';

var Twit = require('twit');

var Bot = new Twit({
  "consumer_secret": "wWQfGgUirDLU58O16weT9lywau8yMtk9qfM9Cd5HIY5Dl6ls4H",
  "consumer_key": "lOUxcmagCIHd6UVJlKIlFXLOD",
  "access_token": "718926387797696512-JWP8SJeE7ya0kmsa2ylAm2Ggw4FpeLl",
  "access_token_secret": "4YhJKB8SyxFl3q99KAQfNegOxkgOwvj8SEDqFVQgdU4YE"
});

var voter = require("../voting");

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	// Bot.post('statuses/retweet/:id', { id: '669520341815836672' }, BotInitiated);
	
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		} else {
      console.log('Bot initiated : 669520341815836672');
		}
	}
	
	BotRetweet();
}

function removeUserMention(text) {
  return text.replace(/[@#](\w+)/gi, '').trim();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {
	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
      var place = "place"
      data.statuses.forEach((tweet) => {
        voter.lookupAddressViaString(removeUserMention(tweet.text)).then(voter.getVotingData)
        .then(function(data) {
          console.log(removeUserMention(tweet.text), "by", tweet.user.screen_name);
          Bot.post('statuses/update', {
            status: `@${tweet.user.screen_name} 1 Go vote at ${data.fullAddress}. Check us out at http://votefor.win`
          }, (err) => console.log("error", err));
        });
      });
		}
	}
	
	setInterval(BotRetweet, 5000);
}

/* Initiate the Bot */
BotInit();
