const express = require('express');
const blogdetails = require('../Model/blog');
const routerPost = express.Router();
const Postdetails = require('../Model/post')


//CREATE POST

routerPost.post("/create", async (req, res) => {
  try {
    const user = new Postdetails(req.body);
    console.log(req.body);
    const insert = await user.save();
    res.status(201).send(insert);
  } catch (error) {
    res.status(400).send(error);
  }
});

// routerPost.post("/create", async (req, res) => {
//   try {
//     const savedPost = await Postdetails.save();
//     res.status(200).json(savedPost);
//     if (req.body) {
//        user = new Postdetails({

//       });
//     } else{
//        user = new Postdetails({
  
//       });
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });



//DELETE
routerPost.delete('/delete/:id', async (req, res) => {
  try {
    const userlist = await Postdetails.findByIdAndDelete(req.params.id)
    res.status(201).send({ message: "deleted!!" });
  } catch (e) {
    res.status(400).send(e);
  }
})


//GET
routerPost.get("/", async (req, res) => {
  try {
    const posts = await Postdetails.find({})
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routerPost;
