const express = require('express');
const cors = require ('cors');
const app = express();
require('./Database/connection');

app.use(cors())
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json())

//routes middleware
const host = '0.0.0.0';
const port = process.env.PORT||7000;
app.use('/user', require('./Route/auth'));
app.use('/blog',require('./Route/post'))

app.listen(port, host,() => console.log(`Server started at port ${port}`))