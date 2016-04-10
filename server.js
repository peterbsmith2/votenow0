"use strict";
const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      request = require('request-promise'),
      voter = require("./voting");


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// enable developer logs
app.use(morgan("dev"));

// enable POST request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(express.static("public"));


// twilio auth info
const twilioAuthToken = "eb79f9d80e57f9565751f8864069023a";
const twilioAcountSID = "AC35d22e92aa9970ac324df8bda02480e8";
const twilio = require('twilio')(twilioAcountSID, twilioAuthToken);

app.post('/sms', function(req, res) {
  var body = req.body;
  console.log(req.body);    
  lookupAddressViaString(body.Body).then(getVotingData).then(function(data) {
  
    
    var response = data.name;

    twilio.messages.create({
      to: body.From,
      from: "+18586836690",
      body: response + " at " + data.fullAddress + "\n(http://www.votenow.win)"
    }, function(err, message) {
      console.log(err);
     // console.log(message.sid);
    });
  
    res.end();
  
  res.json({hey: "hey"});
  });

});

app.post('/slack', function(req,res) {
  if (req.body.token === "eoZ59YsZZedrqyRbANsS833z") {
    var text = req.body.text;
    lookupAddressViaString(text).then(getVotingData).then(function(data) {
    
      console.log(data);
      var response = data.name;
      
      var address = data.fullAddress;
      res.json({"text":"The polling location for " + text + " is\n "  + response + " at " +"<https://maps.google.com/maps/place/"+encodeURI(address)+"|"+ address+">\n<https://twitter.com/home?status=I%20found%20my%20polling%20location%20using%20www.votenow.win%20%23vote%20%23election%20%23usa%20%23opendata%20%23decision2016%20%23election2016%20%23votenow%20|Share On Twitter>"});
    });



  }
});

//Post request for twitter

//There will be twitter code here someday...

// get raw geolocation data
app.get("/api/v1/voter/geo_raw/:lat/:lng", (req, res) => {
  voter.lookupAddress(req.params.lat, req.params.lng).then((data) => {
    res.send(data);
  });
});

// get voter data via geolocation
app.get("/api/v1/voter/geo/:lat/:lng", (req, res) => {
  voter.lookupAddress(req.params.lat, req.params.lng).then(voter.getVotingData).then((data) => {
    if (data.fullAddress === null) {
      res.send({error: "No data? Panic!"});
    } else {
      res.send({
        data: {
          name: data.name || "Polling place",
          address: data.fullAddress,
          disabled: Boolean(data.disabled.length),
          town: data.town,
          district: {
            main: data.district,
            congress: data.congress,
            senate: data.senate,
            assembly: data.assembly,
          },
        }
      });
    }
  });
});

// get voter data via address
app.get("/api/v1/voter/:address", (req, res) => {
  voter.lookupAddressViaString(req.params.address).then(voter.getVotingData).then((data) => {
    if (data.fullAddress === null) {
      res.send({error: "No data? Panic!"});
    } else {
      res.send({
        data: {
          name: data.name,
          address: data.fullAddress,
          disabled: data.disabled,
          town: data.town,
          district: {
            main: data.district,
            congress: data.congress,
            senate: data.senate,
            assembly: data.assembly,
          },
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on", process.env.PORT || 3000);
});
