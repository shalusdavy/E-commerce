const { mongoose } = require("mongoose");
const catagorySchema = new mongoose.Schema({

    catagoryName:{
        type:String,
        required: true,
    },
    catagoryImage:{
        type: String, 
      
    },
    description:{
        type:String,
        required: true,
    }
})
const catagory =mongoose.model("catagory",catagorySchema)
module.exports =catagory;