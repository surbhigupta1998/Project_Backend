const express = require('express');
const app = express();
const port = 7000;
require('./Database/connection')
const cors = require ('cors');

app.use(express.json())
app.use(cors())

//routes middleware
app.use('/blog', require('./Route/auth'));
app.use('/posts',require('./Route/post'))


app.listen(port, function(){
    console.log(`Port : ${port}`);
})