import mongoose from "mongoose";
const Url = "mongodb+srv://school:student123@cluster0.64833pk.mongodb.net/jwt?retryWrites=true&w=majority";
//const Url = "mongodb://127.0.0.1:27017/jwt";
const Connect = async()=>{
    try{
        await mongoose.connect(Url)
    }catch(err){
        console.log(err)
    }
}
export default Connect;