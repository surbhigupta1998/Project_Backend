const express = require('express');
const router = express.Router();
const blogdetails = require('../Model/blog')
const bcrypt = require('bcrypt')
const {registerVal, loginVal} = require('../validation')

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
    const users = await blogdetails.findOne({email: req.body.email})
    if(!users) return res.status(400).send("email not found");

    //password

    const password = await bcrypt.compare(req.body.password, users.password)
    if(!password) return res.status(400).send("invalid password!!");

    // token
    const token = jwt.sign({_id: users._id.toString() }, "private_token")
    res.header('auth-token',token).send({ users:users, token:token});
    console.log(users
    

})

// create
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