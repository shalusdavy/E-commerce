const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({

product_id:{
    type:String,
    // required: true,
    // unique: true
},
name:{
    type:String,
    // required: true,
},
description:{
    type:String,
    // required: true,
},
price:{
    type:String,
    // required: true,
    // min: 0 
},
discount:{
    type:String,
    // min: 0   

},
stockQuantity:{
    type:String,
},
images: [{
type:String,
// required:true,
}],

})
const products=mongoose.model("products",productSchema);
module.exports = products;