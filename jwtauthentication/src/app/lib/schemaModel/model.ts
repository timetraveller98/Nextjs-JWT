import mongoose from "mongoose";
const jwtSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})

export const jwtModel = mongoose.models.keys || mongoose.model('keys', jwtSchema) 