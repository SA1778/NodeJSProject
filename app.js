require('dotenv').config;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/website/style.css`));

app.get('/',(req,res)=>{
    console.log(req.query.message || "No Message Recieved");
    res.sendFile(`${__dirname}/website/index.html`);
}).listen(port, ()=>{console.log(`Listening on Port ${port}...`)});