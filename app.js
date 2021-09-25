const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html")
    })

app.post("/", function(req,res){

    const query = req.body.city;
    // enter your auth api key here
    const apiKey = "";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit + "&appid="+ apiKey;
    https.get(url, function(response){
        console.log("status code", response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"; 
            
            res.write("<h3>The weather is currently " + desc + "</h3>")
            res.write("<h1>the temp in " + query + " is " + temp + " degrees celcius</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send()
        
        })
    })
})    
            

    // res.sendFile(__dirname + "/index.html");

app.listen(3000,function(){
    console.log("server is running on port 300");
})