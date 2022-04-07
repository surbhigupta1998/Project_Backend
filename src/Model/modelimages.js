const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
const Imagedetails = mongoose.model("imageDetail", ImagesSchema)
module.exports = Imagedetails;

