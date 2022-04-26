const routerPost = require('express').Router();
const userdetails = require('../Model/user');
const Blogdetails = require('../Model/blog')
const jwt = require('jsonwebtoken')

//CREATE POST
routerPost.post("/create", async (req, res) => {
  try {
    const { authtoken, title, text, visibility } = req.body
    if (!authtoken)
      return res.status(400).send({ msg: "Unauthorized access" })
    
    const decoded = jwt.verify(authtoken, "surbhigupta@gmail.com");
    const userExist = await userdetails.findOne({ email: decoded.email })
   
    if (!userExist)
      return res.status(400).send({ msg: "Invalid Credentials" })

    const user = new Blogdetails({ title, text, visibility, email: user.email });
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
  const user = await userdetails.findOne({ email: decoded.email })
  if (!user)
    return res.status(400).send({ msg: "Invalid Credentials" })
  
  try {
    const posts = await Blogdetails.find({ email: user.email })
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//DELETE
routerPost.delete('/delete/:id', async (req, res) => {
  try {
    const userlist = await Blogdetails.findByIdAndDelete(req.params.id)
    console.log(userlist)
    return res.status(204).send({ message: "deleted!!" });
  } catch (e) {
    return res.status(400).send(e);
  }
})


//Put
routerPost.put('/update', async (req, res) => {
  try {
    const {id,title,text} = req.body
    const editpost = await Blogdetails.findByIdAndUpdate({ _id: id }, { $set: { title: title, text:text } })
    if(editpost)
      return res.status(204).send({msg:"Resource updated successfully"})
  } catch (e) {
    return res.status(400).send(e);
  }
})

module.exports = routerPost;