//Import Modules, Functions, etc.
const router   = require('./apis/api');
const mongoose = require('mongoose');
const express  = require('express');
const app      = express();

//Define Server Hosting Port
const port = process.env.PORT || 3000;

//Connect to Mongo Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()  => console.log('[SERVER] Mongoose Has Connected'))
.catch(() => console.log('[ERROR]  Mongoose Did Not Connect'));

//Middleware
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin":"http://localhost:3000"});
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Withm Content-Type, Accept");
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', router);

//Listen for HTTP Requests
app.listen(port, console.log(`[SERVER] App Has Started on Port ${port}`));