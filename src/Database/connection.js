const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_DB_ATLAS_CONNECTION;
mongoose.connect(url,{
    useNewUrlParser:true,   
    // useUnfieldTopology : true,
}).then(()=> {
    console.log("Connection is sucessfully ");
}).catch((e)=>{
    console.log("Connection is failed")
})