const express = require('express');
const index = express();
const port = process.env.PORT || 8000;
require('./Database/connection')
const router = require('../src/Route/blogroute')
const  cors = require ('cors');

index.use(express.json())  
index.use(cors())
//routes middleware
index.use('/blog', router);
index.listen(port, function(){
    console.log(`Port : ${port}`);
})