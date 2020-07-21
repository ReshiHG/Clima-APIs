const express = require("express");
const https = require("https");

const app = express();

const url = "https://api.openweathermap.org/data/2.5/weather?q=MeX,MX-CMX&units=metric&lang=sp&appid=c236111c1a1026ac1c025e34506be554";

app.get("/", function(req,res){

        https.get(url, function(response){

        console.log (response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.send("El clima en CDMX es: "+weatherDescription+" con una temperatura de: "+temp+" °C");
        });
    });
});


app.listen(3000, function(){
    console.log("Servidor iniciado en el puerto 3000")
});
