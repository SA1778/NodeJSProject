//Import Modules, Functions, etc.
const createNewPerson = require("../models/models");
const path = require('path');
const express = require('express');
const router = express.Router();

//Website Path
let webPath = path.join(__dirname, '/../website/index.html');

//Api's
router.route('/')
.get((req, res)=>{
    res.sendFile(webPath);
}).post((req, res) => {
    let { name, address } = req.body;
    createNewPerson(name, address);
    res.sendFile(webPath);
});

module.exports = router;
