//Import Modules, Functions, etc.
const Temp = require("../models/models");
const express = require('express');
const router  = express.Router();

//Api's
router.route('/data')
.get((req, res) => {
    Temp.find()
    .then(tempData => {
        let data = [];
        for(const index in tempData) data.push({date: tempData[index].date, value: tempData[index].value})
        console.log(data)
        res.json(data);
    })
    .catch(err => res.statusCode(400).send(err));
 })
.post((req, res) => {
    const newTemp = new Temp({
        temp: req.body.temp,
        date: new Date
    });
    newTemp.save()
    .then(()   => res.send('Temperature Logged Successfully'))
    .catch(err => res.send(err));
})

//Exports
module.exports = router;
