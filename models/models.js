//Import Modules, Functions, etc.
const mongoose = require('mongoose');

//Schema
const tempSchema = new mongoose.Schema({
    temperature: {type: Number},
    date:  {type: Date}
});

//Models
const Temp = mongoose.model("Temperature", tempSchema);

module.exports = Temp;