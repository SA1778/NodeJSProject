//Import Modules, Functions, etc.
const mongoose = require('mongoose');

//Schema
const tempSchema = new mongoose.Schema({
    temp:    {type: Number},
    date:    {type: Date}
});

//Models
const Temp = mongoose.model("Temperature", tempSchema);

//Functions
function logTemperature(temp){
    let newTemp = new Temp({temp: temp});
    newTemp.save()
    .then(()   => console.log('[Server] Person Saved Successfully'))
    .catch(err => console.log(err));
}

module.exports = {
    logTemperature: logTemperature,
    Temp: Temp
};