const mongoose = require('mongoose');

const companyModel = new mongoose.Schema({
    companyName :{ type: String,required: true},
    city :{type: String, required: true}
},{timestamps:true})

module.exports =  mongoose.model( 
    'companyModel', companyModel);