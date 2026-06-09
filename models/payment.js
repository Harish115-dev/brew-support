import mongoose, { Schema, model, models } from "mongoose";


const paymentschema = new Schema({
    name:{type:String,required:true},
    to_user:{type:String,required:true},
    oid:{type:String,required:true},
    message:{type:String},
    amount:{type:Number,required:true},
    createdat:{type:Date,default:Date.now},
    updatedat:{type:Date,default:Date.now},
    done:{type:Boolean,default:false},


});
export default  mongoose.models.payment || model("payment",paymentschema);