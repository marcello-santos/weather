const express = require ('express');
const hbs = require('hbs');
const app = express();
const request = require('request');
const yargs = require('yargs');

//chaves api
const GoogleAPIKey ="AIzaSyCjOg22oiGgftI-tRPW9pFwsKtP8EUG2D4";
const DarskyAPIKey="74230c2510793d508e282426eae69ad4";

const argv = yargs.argv;

//var address = "Vila do Conde"; 
var address= argv.address;

var addressEnconded = encodeURIComponent(address);

//aqui começa requests dos api
request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?key=${GoogleAPIKey}&address=${addressEnconded}`,
    json: true
}, (error,response, body) =>{
    var lat = body.results[0].geometry.location.lat;
    var lng = body.results[0].geometry.location.lng;
    var formatted_address = body.results[0].formatted_address;

    console.log(formatted_address);
    console.log(lat,lng);

    request({
        url:`https://api.darksky.net/forecast/${DarskyAPIKey}/${lat},${lng}?units=si`,
        json: true
    }, (error,response, body) =>{
        var Temp = body.currently.temperature;
        var aparentTemp = body.currently.apparentTemperature;    
});
});

app.use(express.static(__dirname + '/public'));

        app.set('view engine', 'hbs');

        app.get('/', (req,res,) => {
            res.render("index.hbs", {
                });
        
        app.get ('/weather', (req,res)=>{
            console.log("here...");
            res.render("papagaio.hbs",{texto:req.query.texto });
        });

    /*res.render('welcome.hbs',{
            Temp: "yolo",
            title: "welcome to my site!",
            text: "server"
        });
        */
});

app.listen(3000);