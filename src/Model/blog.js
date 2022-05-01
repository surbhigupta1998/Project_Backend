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
   },
   likes:{
     type:Number,
     default:0,
     min:0
   },
   dislikes:{
     type:Number,
     default:0,
     min:0
   },
   comments:{
     type:[{username:String,comment:String,"date":String}]
   }
  }
);
//collection
const blogdetails = new mongoose.model("blogs", BlogSchema)
module.exports = blogdetails;
