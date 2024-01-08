const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    joinedDate:{
        type:String
    },
    Rent:{
        type:String
    } 
})


// we define the collection in mongodb as userschema as schema/model ...here users is used 
//coz already users collection created in mongodb else it will creata  a new collection
const users = mongoose.model('users',userSchema)
//to export
module.exports = users
//module.exports = rent