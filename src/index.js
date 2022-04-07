const express = require('express');
const index = express();
const port = 7000;
require('./Database/connection')
const router = require('./Route/blogroute')
const routerPost = require('../src/Route/post')
const  cors = require ('cors');
const routerImages = require('../src/Route/imageroute')


index.use(express.json())  
index.use(express.urlencoded({ extended: true }));
index.use(cors())
//routes middleware
index.use('/blog', router);
index.use('/posts',routerPost)
index.use('/images',routerImages)

index.listen(port, function(){
    console.log(`Port : ${port}`);
})