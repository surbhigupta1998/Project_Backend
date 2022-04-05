const express = require('express');
const router = express.Router();
const blogdetails = require('../Model/blog')
const bcrypt = require('bcrypt')
const registerVal = require('../validation')
const loginVal =require('../validation')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const {error} = registerVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check email
    const email = await blogdetails.findOne({email: req.body.email})
    if(email) return res.status(400).send("email already exist!!!")

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new blogdetails({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const insert = await user.save();
        res.status(200).send(insert)
        console.log(req.body);
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/login', async (req, res) => {
    const {error} = loginVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //emaiil
    let blog = await blogdetails.findOne({email: req.body.email})
    if(!blog) return res.status(400).send("email not found");

    //password

    const password = await bcrypt.compare(req.body.password, blog.password)
    if(!password) return res.status(400).send("invalid password!!");

    // token
    const token = jwt.sign({_id: blog._id.toString() }, "private_token")
    res.header('auth-token',token).send(token);

})

//create
// router.post('/create', async (req, res) => {
//        try{
//            const user = new blogdetails(req.body);
//            console.log(req.body)
//            const insert = await user.save();
//            res.status(201).send(insert);
//        }catch(e){
//            res.status(400).send(e);
//        }
//     // res.send("hello surbhi");
// })

module.exports = router;  