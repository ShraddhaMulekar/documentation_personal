import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email:{
        type : email,
        unique : true
    },
    password : {
        type:String,
        required : true
    },
    role:{
        type:String,
        
    }
})