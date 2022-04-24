const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   text:{
    type: String,
    required: true,
   },
   email:{
    type: String
   },
   visibility:{
    type:Boolean,
    default:false
   }

  }
  
);
//collection
const blogdetails = new mongoose.model("blogs", BlogSchema)
module.exports = blogdetails;
