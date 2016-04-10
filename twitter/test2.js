var TwitterBot = require("node-twitterbot").TwitterBot;

// Include your access information below
var Bot = new TwitterBot({
        "consumer_secret": "wWQfGgUirDLU58O16weT9lywau8yMtk9qfM9Cd5HIY5Dl6ls4H",
        "consumer_key": "lOUxcmagCIHd6UVJlKIlFXLOD",
                "access_token": 
                "718926387797696512-JWP8SJeE7ya0kmsa2ylAm2Ggw4FpeLl",
        "access_token_secret": "4YhJKB8SyxFl3q99KAQfNegOxkgOwvj8SEDqFVQgdU4YE"
});

//initialize
voteaddr = "No address found.  Please try again.";
useraddr = "";
username = "";


// Create an action called 'tweet' associated with some function
Bot.addAction("tweet", function(twitter, action, tweet) {
          // Within the action 'tweet', tell the Bot to create a tweet
            Bot.tweet(username + "The voting location closest to you is:\n" + voteaddr+ date.toISOString(Date.now()));
});

// Set the standard input (stdin) encoding to UTF8
process.stdin.setEncoding('utf8');
// If any data is found, perform the associated function
process.stdin.on('data', function (chunk) {
          // Some data was found ending in the newline character.
            //  Let the user know the script is about to close.
              console.log("Enter was pressed. Closing script...");
                // Exit the process
                  process.exit();
});

// Warn the user we are entering an infinite loop
console.log("Starting infinite loop. Press Enter to stop.");

// Create a new Date object to parse the current time
var date = new Date();

var listenerFunction = function(tweet) {
        consolelog(tweet);
        return true;
}

//try stream
Bot.listen("listener",listenerFunction,function(twitter, action, tweet)
{
        console.log(twitter, action, tweet);
        Bot.tweet;
});


/*
//my check for tweet to us
function tweetThatContainsName(tweet) {
        if (tweet.indexOf("@votenow0") !== -1) {
                return true;
        } else {
                return false;
        }
}
*/

// Set up an interval of 2 minutes
//  (2 minutes = 120 seconds = 120000 milliseconds)
setInterval(function() {
          // On every interval, call the 'tweet' action
          Bot.listener;
          // Log a message to the console with the current time
          console.log("Log: Sent a tweet -- " +
          date.toISOString(Date.now() ) );
}, 5000);
//}, 120000);

