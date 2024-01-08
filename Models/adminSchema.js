const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
       required:true
    },
    name:{
        type:String,
       // required:true
    },
    password:{
        type:String,
        required:true
    }
   
})


const adminData = mongoose.model('adminData',adminSchema)
//to export
module.exports = adminData
 