// "use strict"

// Requiring express in our server
const express = require('express');
const app = express();
//create a token from jwt.io
const key = "jwt token"

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


//v1/auth endpoint
app.post('/v1/auth', function(req,res){
  console.log("/v1/auth request recieved")

  username = req.body.username
  password = req.body.password
  if (username == "username" ){
    if(password == "password"){
      token = {
        "access-token" : key,
        "expires": "2022-01-11T22:18:26.625Z"
    }
    res.json(token)
    }else{
      res.send('403 error: password incorrect')
    }
  }else{
    res.send('403 error: username Not found')

  }
});

//v1/hello endpoint
app.get('/v1/hello', function(req, res) {
  console.log("/v1/hello request recieved")
  // let query_token = req.query.token
  console.log("token", req.query.token)
  // if(token.includes(query_token)){
  if(req.query.token == key){
      console.log("hello")
    res.json({"hello":"Welcome to Weather API"});
  }else{
    res.send('403 error: API key Not found');
  }
});



///v1/weather endpoint
app.get('/v1/weather', function(req, res) {
  console.log("/v1/weather request recieved")
  if(req.query.token == key){
    res.json({
      "coord": {"lon": -123.262,"lat": 44.5646},
      "weather": [{"id": 802,"main": "Clouds","description": "scattered clouds","icon": "03d" }],
      "base": "stations",
      "main": {"temp": 300.04,"feels_like": 280.04,"temp_min": 278.79, "temp_max": 284.95,"pressure": 1020,"humidity": 81,"sea_level": 1020,"grnd_level": 1011},
      "visibility": 10000,
      "wind": { "speed": 1.28,"deg": 17,"gust": 1.3},
      "clouds": {"all": 50},
      "dt": 1642376495,
      "sys": {"type": 2,"id": 2006021,"country": "US", "sunrise": 1642347934, "sunset": 1642381185 },
      "timezone": -28800,
      "id": 5720727,
      "name": "Corvallis",
      "cod": 200
    });
  }else{
    res.send('403 error: API key Not found');
  }
});

// Defining get request at '/GET/data' route
app.get('/data/2.5/weather', function(req, res) {
  console.log("/data/2.5/weather request recieved")
  res.json({
    "coord": {"lon": -123.262,"lat": 44.5646},
    "weather": [{"id": 802,"main": "Clouds","description": "scattered clouds","icon": "03d" }],
    "base": "stations",
    "main": {"temp": 300.04,"feels_like": 280.04,"temp_min": 278.79, "temp_max": 284.95,"pressure": 1020,"humidity": 81,"sea_level": 1020,"grnd_level": 1011},
    "visibility": 10000,
    "wind": { "speed": 1.28,"deg": 17,"gust": 1.3},
    "clouds": {"all": 50},
    "dt": 1642376495,
    "sys": {"type": 2,"id": 2006021,"country": "US", "sunrise": 1642347934, "sunset": 1642381185 },
    "timezone": -28800,
    "id": 5720727,
    "name": "Corvallis",
    "cod": 200
  });
});
  

// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
  console.log("Server is running at port 3000");
});

