//Import Modules, Functions, etc.
const mongoose = require('mongoose');

//Schema
const tempSchema = new mongoose.Schema({
    value: {type: Number},
    date:  {type: Date}
});

//Models
const Temp = mongoose.model("Temperature", tempSchema);

module.exports = Temp;