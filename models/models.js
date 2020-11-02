//Import Modules, Functions, etc.
const mongoose = require('mongoose');

//Schema
const personSchema = new mongoose.Schema({
    name: String,
    address: String
});

//Models
const Person = mongoose.model("Person", personSchema);

//Functions
function createNewPerson(name, address){
    let newPerson = new Person({name: name, address: address});
    newPerson.save((error)=>{
        if(error) return console.error(error);
        console.log('Data Saved Successfully');
    })
}

module.exports = createNewPerson;