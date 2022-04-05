const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/userDb",{
    useNewUrlParser:true,   
}).then(()=> {
    console.log("Connection is sucessfully ");
}).catch((e)=>{
    console.log("Connection is failed")
})