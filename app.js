require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

// allow-cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// handle post requests (bodyParser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.database, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const port = process.env.port || 6666;

//default URL message
app.get('/', (req, res) => res.send('Session'));

//routes
require('./routes/route.js')(app);

//server start
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
