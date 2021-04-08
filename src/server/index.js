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

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log('server running');
    console.log(`running on http://localhost:${port}`);
}

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
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        content: req.body.content,
    };
    Object.assign(projectData, newEntry);
});


