const mongoose = require("mongoose");

const cartSchema =new mongoose.Schema({

name:{
    type:String,
    required: true,
},
description:{
    type:String,
    required: true,
},
price:{
    type:String,
    required: true,
    min: 0 
},

images: {
    type: String,
     
}

})
const cart=mongoose.model("products",cartSchema);
module.exports = cart;