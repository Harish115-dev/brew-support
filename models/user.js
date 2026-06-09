
import mongoose, { Schema, model, models } from "mongoose";


const Userschema = new Schema({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayid:{type:String},
    razorpaysecret:{type:String},
    createdat:{type:Date,default:Date.now},
    updatedat:{type:Date,default:Date.now},

});
export default  mongoose.models.User || model("User",Userschema);