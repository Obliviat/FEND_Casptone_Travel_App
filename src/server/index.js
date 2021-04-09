//Creatin the improvised database to handle the informations we got
projectData = {};

//Requiring express and other modules we need
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

//tell the server what folder to use
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Get Route that uses the url /all
app.get('/all', sendData);
function sendData(req, res) {
    console.log(req);
    res.send(projectData);
};

// POST method route
app.post('/addData', (req, res) => {
    const newEntry = {
        date: req.body.date,
        state: req.body.state,
        country: req.body.country,
        content: req.body.content,
    };
    Object.assign(projectData, newEntry);
});


