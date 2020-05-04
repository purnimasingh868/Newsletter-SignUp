// jshint esversion:6

// https://shielded-ridge-48262.herokuapp.com/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
const https = require("https");



app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.FName;
  const secondName = req.body.LName;
  const emailId = req.body.email;


  const data = {
    members: [{
      email_address: emailId,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }

    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us4.api.mailchimp.com/3.0/lists/6973423f42";
  const options = {
    method: "POST",
    auth: "purnima:41de2bebe906ac0ee102ff3881c648a9-us"

  };

  const request = https.request(url, options, function(response) {


    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");

    } else {
      res.sendFile(__dirname + "/failure.html");

    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
      });

    request.write(jsonData);
    request.end();



});

app.post("/failure", function(req, res){
  res.redirect("/");
});


  app.listen("3000", function() {
    console.log("server is running on port 3000");
  });







  // list id:6973423f42


  // api key: 41de2bebe906ac0ee102ff3881c648a9-us4
