//Creatin the improvised database to handle the informations we got
const alldata = {};

//Requiring express and other modules we need
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//creating the server using express
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//tell the server what folder to use
app.use(express.static('dist'));

//get request to rout and send index.html file inside dist
app.get('/', function(req,res){
    res.sendFile('dist/index.html')
});

//getting data posted in forecast and saving inside database
app.post('/forecast', async(req, res)=>{
    const body = req.body;
    alldata.minTemp = body.minTemp;
    alldata.maxTemp = body.maxTemp;
    alldata.description = body.description;
    alldata.country = body.country;
    alldata.cityName = body.cityName;
    alldata.dateLeaving = body.dateLeaving;
    alldata.dateReturning = body.dateReturning;
    alldata.picture = body.picture;
    console.log(body);
    const jsonData = JSON.parse('{"response": "POST received"}');
    res.send(jsonData);
    console.log(jsonData);
});
// get request to /save and sending all datas saved
app.get('/save', async(req, res)=>{
    res.send(alldata);
});

module.exports = app;