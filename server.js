"use strict";
const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
        request = require('request-promise');

// enable developer logs
app.use(morgan("dev"));

// enable POST request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));

// twilio auth info
const twilioAuthToken = "eb79f9d80e57f9565751f8864069023a";
const twilioAcountSID = "AC35d22e92aa9970ac324df8bda02480e8";
const twilio = require('twilio')(twilioAcountSID, twilioAuthToken);

app.post('/sms', function(req, res) {
  var body = req.body;
  console.log(req.body);    
  lookupAddressViaString(body.Body).then(getVotingData).then(function(data) {
  
    console.log(data);
    var response = data.name;

    twilio.messages.create({
      to: body.From,
      from: "+18586836690",
      body: response
    }, function(err, message) {
      console.log(err);
     // console.log(message.sid);
    });
  
    res.end();
  
  });

});

app.post('/slack', function(req,res) {
  if (req.body.token === "hxFBZTk5wykVuCnq1s9qBY34") {
    var text = req.body.text;
    var response;
    
    response = "test";



    res.json(response);
  }
});

// get raw geolocation data
app.get("/api/v1/voter/geo_raw/:lat/:lng", (req, res) => {
  lookupAddress(req.params.lat, req.params.lng).then((data) => {
    res.send(data);
  });
});

// get voter data via geolocation
app.get("/api/v1/voter/geo/:lat/:lng", (req, res) => {
  lookupAddress(req.params.lat, req.params.lng).then(getVotingData).then((data) => {
    if (data.name === null) {
      res.send({error: "No data? Panic!"});
    } else {
      res.send({
        data,
      });
    }
  });
});

// get voter data via address
app.get("/api/v1/voter/:address", (req, res) => {
  lookupAddressViaString(req.params.address).then(getVotingData).then((data) => {
    if (data.name === null) {
      res.send({error: "No data? Panic!"});
    } else {
      res.send({
        data,
      });
    }
  });
});

// lookup the address for the lat and lng of a location
function lookupAddress(lat, lng) {
  return request({
    method: "GET",
    url: "https://api.geocod.io/v1/reverse",
    qs: {
      q: `${lat},${lng}`,
      api_key: "0986aa769a9a0c42065541c057ca55000c7a400",
    },
  }).then((data) => {
    return JSON.parse(data);
  }).then((json) => {
    if (json.results && json.results.length) {
      let result = json.results[0];
      return {
        number: result.address_components.number,
        street: result.address_components.formatted_street,
        city: result.address_components.city,
        state: result.address_components.state,
        country: result.address_components.country,
        zip: result.address_components.zip,
        location: result.location,
      };
    } else {
      return "bad geoloaction info";
    }
  });
}

// lookup the address for the lat and lng of a location
function lookupAddressViaString(address) {
  return request({
    method: "GET",
    url: "https://api.geocod.io/v1/geocode",
    qs: {
      q: address,
      api_key: "0986aa769a9a0c42065541c057ca55000c7a400",
    },
  }).then((data) => {
    return JSON.parse(data);
  }).then((json) => {
    if (json.results && json.results.length) {
      let result = json.results[0];
      return {
        number: result.address_components.number,
        street: result.address_components.formatted_street,
        city: result.address_components.city,
        state: result.address_components.state,
        country: result.address_components.country,
        zip: result.address_components.zip,
        location: result.location,
      };
    } else {
      return "bad geoloaction info";
    }
  });
}

function getVotingData(address) {
  return request({
    method: "POST",
    url: "https://apis.opensyracuse.org/elections/",
    json: {
      house_num: address.number,
      street_name: address.street,
      zip: address.zip,
    },
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on", process.env.PORT || 3000);
});
