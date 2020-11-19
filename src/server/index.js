//Creatin the improvised database to handle the informations we got
const alldata = {};

//Requiring express and other modules we need
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//creating the server using express
const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(cors());

//tell the server what folder to use
app.use(express.static('dist'));

//get request to rout and send index.html file inside dist
app.get('/', function(req,res){
    res.sendFile('dist/index.html')
});
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// //getting data posted in forecast and saving inside database
// app.post('/forecast', async(req, res)=>{
//     const body = req.body;
//     alldata.minTemp = body.minTemp;
//     alldata.maxTemp = body.maxTemp;
//     alldata.description = body.description;
//     alldata.country = body.country;
//     alldata.cityName = body.cityName;
//     alldata.dateLeaving = body.dateLeaving;
//     alldata.dateReturning = body.dateReturning;
//     alldata.picture = body.picture;
//     console.log(body);
//     const jsonData = JSON.parse('{"response": "POST received"}');
//     res.send(jsonData);
//     console.log(jsonData);
// });
// // get request to /save and sending all datas saved
// app.get('/save', async(req, res)=>{
//     res.send(alldata);
// });

// module.exports = app;


// app.post('/forecast', async (req, res) => {

//     //get api data from weatherbit
//     const getForecast = await fetch(req.body.url);

//     // console.log(req.body.url);
//     const response = getForecast.json();
//     // .then( (response) => {
//     //     return response.json();
//     // })
//     response.then((forecast) => {

//         const weatherbit = {
//             current_temp: forecast.data[0].temp,
//             // current_feeltemp: forecast.data[0].app_temp,
//             current_icon: forecast.data[0].weather.icon,
//             daily_tempHigh: forecast.data[0].max_temp,
//             daily_tempLow: forecast.data[0].low_temp,
//             daily_icon: forecast.data[0].weather.icon

//         }

//         res.send(weatherbit);

//     }).catch((error) => {
//         console.log(error);
//     })
//     // console.log(darkSky);

// })