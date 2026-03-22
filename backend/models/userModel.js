import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true,
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type:String,
        required : true,
        minlength : 6,
    },
    role:{
        type:String,
        enum: ["admin", "employer", "user"],
        default : "user"
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpire : {
        type:Date
    },
    createdAt:{
        type:Date,
        default : Date.now()
    }
}, {
    versionKey:false
})

export const UserModel = mongoose.model("user", userSchema)