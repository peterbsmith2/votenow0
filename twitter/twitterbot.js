var twitter = require('ntwitter');

// Include your access information below
var twit = new twitter({
        "consumer_key": "lOUxcmagCIHd6UVJlKIlFXLOD",
        "consumer_secret": "wWQfGgUirDLU58O16weT9lywau8yMtk9qfM9Cd5HIY5Dl6ls4H",
        "access_token": "718926387797696512-JWP8SJeE7ya0kmsa2ylAm2Ggw4FpeLl",
        "access_token_secret": "4YhJKB8SyxFl3q99KAQfNegOxkgOwvj8SEDqFVQgdU4YE"
});

twit.stream('user', {track:'nodejs'}, function(stream) {
        stream.on('data', function (data) {
                console.log(data);
        });
        stream.on('end', function (response) {
                // Handle a disconnection
        });
        stream.on('destroy', function (response) {
                // Handle a 'silent' disconnection from Twitter, no end/error
                // event fired
        });
        setTimeout(stream.destroy, 10000);

        stream.on('error', console.error.bind(console));
});
