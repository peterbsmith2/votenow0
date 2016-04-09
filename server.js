var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

// enable developer logs
app.use(morgan("dev"));

// enable POST request body parsing
app.use(bodyParser.json());

// twilio auth info
const twilioAuthToken = "eb79f9d80e57f9565751f8864069023e8";
const twilioAcountSID = "AC35d22e92aa9970ac324df8bda02480";
const twilio = require('twilio')(twilioAcountSID, twilioAuthToken);

app.get('/sms', function(req, res) {

  var response = "Hey";
  twilio.messages.create({
    to: "+16313749744",
    from: "+18586836690",
    body: response
  })
  
  res.json({hey: "hey"});

});

app.post('/slack', function(req,res) {
  
  if (req.body.token === "hxFBZTk5wykVuCnq1s9qBY34") {
    var text = req.body.text;
    var response;
    
    response = "test";



    res.json(response);

  }
})


app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on", process.env.PORT || 3000);
});
