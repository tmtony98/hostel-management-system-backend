const mongoose = require('mongoose')


const expenseSchema = new mongoose.Schema({
    id:{
        type:Number,
      //  required:true
    },
    currentBill:{
        type:Number,
      //  required:true
    },
    waterBill:{
        type:Number,
       // required:true
    },
    messBill:{
        type:Number,
        //required:true
    },
    staffSalary:{
        type:Number
    },
    selectedMonth:{
        type:String
    }     
})

const expenseData = mongoose.model("expenseData",expenseSchema)

module.exports = expenseData