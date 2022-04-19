const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   text:{
    type: String,
    required: true,
   },
   status:{
    type: String,
    required: true,
   }

  },
  
);
//collection
const Postdetails = new mongoose.model("postDetail", PostSchema)
module.exports = Postdetails;
