const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",{
    useNewUrlParser:true,   
}).then(()=> {
    console.log("Connection is sucessfully ");
}).catch((e)=>{
    console.log("Connection is failed")
})