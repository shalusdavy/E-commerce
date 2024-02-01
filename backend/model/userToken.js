import mongoose, { Schema } from "mongoose";

const userTokenSchema=newSchema({

userId:{
    type:Schema.Types.ObjectId,
    required:true
},
token:{
    type:String,
    required:true
},
create:{
    type:Date,
    default:Date.now,
    
}

})
const UserToken=mongoose.model("UserToken","userTokenSchema");
export default UserToken;