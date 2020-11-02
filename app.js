//Import Modules, Functions, etc.
const router = require('./apis/api');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//Define Server Hosting Port
const port = process.env.PORT || 3000;

//Connect to Mongo Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongoose Has Connected");
})
.catch(() => {
    console.error("Mongoose Did Not Connect");
});

//Middleware
app.use(express.static(`${__dirname}/website/`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

//Listen for HTTP Requests
app.listen(port, console.log(`App Has Started on Port ${port}`));