//Import Modules, Functions, etc.
const createNewPerson = require("../models/models");
const path    = require('path');
const express = require('express');
const router  = express.Router();

//Website Path
let mainPath = path.join(__dirname, '/../website/index.html');
let chartPath = path.join(__dirname, '/../website/chart.html');
let formPath  = path.join(__dirname, '/../website/form.html');
//Api's
router.route('/')
.get((req, res) => {
    res.sendFile(mainPath);
});

router.route('/chart')
.get((req, res) => {
    res.sendFile(chartPath);
});

router.route('/form')
.get((req, res) => {
    res.sendFile(formPath);
})
.post((req, res) => {
    let { name, address } = req.body;
    createNewPerson(name, address);
    res.sendFile(formPath);
})

//Exports
module.exports = router;
