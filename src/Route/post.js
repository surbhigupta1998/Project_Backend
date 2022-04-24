const express = require('express');
const userdetails = require('../Model/user');
const routerPost = express.Router();
const Blogdetails = require('../Model/blog')
const jwt = require('jsonwebtoken')

//CREATE POST
routerPost.post("/create", async (req, res) => {
  try {
    const { authtoken, title, text, visibility } = req.body
    if (!authtoken)
      return res.status(400).send({ msg: "Unauthorized access" })
    
    const decoded = jwt.verify(authtoken, "surbhigupta@gmail.com");
    const banda = await userdetails.findOne({ email: decoded.email })
   
    if (!banda)
      return res.status(400).send({ msg: "Invalid Credentials" })

    const user = new Blogdetails({ title, text, visibility, email: banda.email });
    const insert = await user.save();
    return res.status(201).send(insert);
  } catch (error) {
    return res.status(400).send(error);
  }
});


//GET - Public Post
routerPost.get("/", async (req, res) => {
  try {
    const posts = await Blogdetails.find({})
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST - Private Post
routerPost.post("/draft", async (req, res) => {
  const { authtoken } = req.body;

  if (!authtoken)
    return res.status(400).send({ msg: "Login First to see posts" })

  const decoded = jwt.verify(authtoken, "surbhigupta@gmail.com");
  const banda = await userdetails.findOne({ email: decoded.email })
  if (!banda)
    return res.status(400).send({ msg: "Invalid Credentials" })
  
  try {
    const posts = await Blogdetails.find({ email: banda.email })
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//DELETE
routerPost.delete('/delete/:id', async (req, res) => {
  try {
    const userlist = await Blogdetails.findByIdAndDelete(req.params.id)
    res.status(201).send({ message: "deleted!!" });
  } catch (e) {
    res.status(400).send(e);
  }
})


//Put
routerPost.put('/editall/:id', async (req, res) => {
  try {

    console.log(req.body)
    const editpost = await Blogdetails.findByIdAndUpdate({ _id: req.params._id }, { $set: { title: req.body.title } })
    res.send(editpost)
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = routerPost;