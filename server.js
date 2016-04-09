var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

// enable developer logs
app.use(morgan("dev"));

// enable POST request body parsing
app.use(bodyParser.json());


app.post('/slack', function(req,res) {
  
  var text = req.body.text;
  var response;

  





  res.json(response);

})


app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on", process.env.PORT || 3000);
});
