const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const place = req.body.cityName;
    const units = "metric";
    const language = "sp";
    const apiKey = "c236111c1a1026ac1c025e34506be554";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units="+units+"&lang="+language+"&appid="+apiKey;

    https.get(url, function(response){

        console.log (response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>El clima en "+place+" es: "+weatherDescription+"</h1>");
            res.write("<h3>con una temperatura de: "+temp+" °C</h3>");
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
});



app.listen(3000, function() {
    console.log("Servidor iniciado en el puerto 3000")
});
