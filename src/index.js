const express = require('express');
const cors = require ('cors');
const app = express();
require('./Database/connection');
const port = 7000;

app.use(cors())
app.use(express.json())

//routes middleware
app.use('/blog', require('./Route/auth'));
app.use('/posts',require('./Route/post'))

app.listen(port, () => console.log(`Server started at port ${port}`))