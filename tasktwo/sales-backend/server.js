const express = require('express');
const cors = require("cors");
const app = express();

const mongoose = require('mongoose');
const {MONGO_DB} = require('./config');
mongoose.connect(MONGO_DB);

mongoose.connection.on('connected', () => {
    console.log("connected");
});
mongoose.connection.on('error', (error) => {
    console.log("Some error ", error);
});

const APP_PORT = 9999;

app.use(cors());
app.use(express.json());

require('./models/sales_model');
require('./models/user_model');

app.use(require('./routes/sales_route'));
app.use(require('./routes/user_route'));

//more options here - https://github.com/villadora/express-bunyan-logger#usage
app.use(require('express-bunyan-logger')({
    name: 'logger',
    format: ":remote-address - :user-agent[major] custom logger",
    streams: [{
        level: 'info',
        stream: process.stdout
    }]
  }));

app.listen(APP_PORT, ()=>{
    console.log("Server started on port: " +`${APP_PORT}`);
});

