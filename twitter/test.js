//Initialization
var TwitterBot = require("node-twitterbot").TwitterBot

var Bot = new TwitterBot({
        "consumer_secret": "wWQfGgUirDLU58O16weT9lywau8yMtk9qfM9Cd5HIY5Dl6ls4H",
        "consumer_key": "lOUxcmagCIHd6UVJlKIlFXLOD",
                "access_token": 
                "718926387797696512-JWP8SJeE7ya0kmsa2ylAm2Ggw4FpeLl",
        "access_token_secret": "4YhJKB8SyxFl3q99KAQfNegOxkgOwvj8SEDqFVQgdU4YE"
});

Bot.addAction("tweet", function(twitter, action, tweet) {
          console.log("called", twitter, action, tweet);
          Bot.tweet("I'm posting a tweet!");
});

voteaddr = "No address found.  Please try again.";
useraddr = "";
username = "";

function tweetThatContainsName(tweet) {
        if (tweet.indexOf("@votenow0") !== -1) {
                return true;
        } else {
                return false;
        }
}

//Setup Listener
Bot.listen("listening", tweetThatContainsName, function(twitter, action, tweet)
{
        Bot.now("tweet");
        //Respond with tweet on user's wall
        //Bot.tweet(username + "The voting location closest to you is:\n" + voteaddr);
});

while (1) {}
