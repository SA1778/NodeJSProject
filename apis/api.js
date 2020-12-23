//Import Modules, Functions, etc.
const Temp = require("../models/models");
const express = require('express');
const router  = express.Router();

//Api's
router.route('/')
.get((req, res) => {
    res.redirect('/data');
})
.post((req, res) => {
    res.redirect('/data');
})

router.route('/data')
.get((req, res) => {
    Temp.find()
    .then(tempData => {
        console.log(`[SERVER] Data Sent to ${req.ip}`);
        res.json(tempData);
    })
    .catch(err => res.send(err));
 })
.post((req, res) => {
    const newTemp = new Temp({
        temperature: req.body.temperature,
        date: new Date
    });
    newTemp.save()
    .then(()   => res.send('Data Logged Successfully'))
    .catch(err => res.send(err));
})

//Exports
module.exports = router;
