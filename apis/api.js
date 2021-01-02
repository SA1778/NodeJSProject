//Import Modules, Functions, etc.
require('dotenv').config();
const Temp    = require("../models/models");
const express = require('express');
const router  = express.Router();

//Api's
router.route('/data')
.get((req, res) => {
    Temp.find()
    .then(tempData => {
        res.json(tempData); //Sendstatus 200
    })
    .catch(err => res.send(err)); //Sendstatus 500
 })
.post((req, res) => {
    if(req.body.key === process.env.POSTKEY){
        const newTemp = new Temp({
            temperature: req.body.temperature,
            date: new Date
        });
        newTemp.save()
        .then(()   => res.send('Data Logged Successfully')) //Sendstatus 200
        .catch(err => res.send(err));     //Sendstatus 500
    }else if(!req.body.key){
        res.send("No Access Key Included"); //Sendstatus 401
    }else if(req.body.key !== process.env.POSTKEY){
        res.send("Incorrect Access Key"); //Sendstatus 401
    }
})

//Exports
module.exports = router;
