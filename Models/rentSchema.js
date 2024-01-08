const mongoose = require('mongoose')


const rentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
      //  required:true
    },
    number:{
        type:Number,
       // required:true
    },
    room:{
        type:String,
        //required:true
    },
    selectedMonth:{
        type:String
    },
    rentAmount:{
        type:Number
    } ,
    rentStatus:{
        type:String}
    
})

const rent = mongoose.model("rentDetails",rentSchema)

module.exports = rent