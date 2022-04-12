const express = require('express');
const blogdetails = require('../Model/blog');
const routerPost = express.Router();
const Postdetails = require('../Model/post')


//CREATE POST
// routerPost.post("/create-post", async (req, res) => {
//     const newPost = new postdetails(req.body);
//     try {
//       const savedPost = await newPost.save();
//       res.status(200).json(savedPost);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
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
  
  //UPDATE POST
  routerPost.put("single-id-update/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE POST
  // routerPost.delete("/:id", async (req, res) => {
  //   try {
  //     const post = await blogdetails.findById(req.params.id);
  //     if (post.username === req.body.username) {
  //       try {
  //         await post.delete();
  //         res.status(200).json("Post has been deleted...");
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     } else {
  //       res.status(401).json("You can delete only your post!");
  //     }
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  routerPost.delete('/delete/:id', async (req, res) => {
    try {
      const userlist = await blogdetails.findByIdAndDelete(req.params.id)
      res.status(201).send({ message: "deleted!!" });
    } catch (e) {
      res.status(400).send(e);
    }
  })
  
  //GET POST
  routerPost.get("/single-id/:id", async (req, res) => {
    try {
      const post = await blogdetails.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS
  // routerPost.get("/all-post", async (req, res) => {
  //   const username = req.query.user;
  //   const catName = req.query.cat;
  //   try {
  //     let posts;
  //     if (username) {
  //       posts = await blogdetails.find({ username });
  //     } else if (catName) {
  //       posts = await Post.find({
  //         categories: {
  //           $in: [catName],
  //         },
  //       });
  //     } else {
  //       posts = await Post.find();
  //     }
  //     res.status(200).json(posts);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  // routerPost.get("/read", async (req, res) => {
  //   try {
  //     const users = await blogdetails.find();
  //     res.send(users)
  //   } catch (e) {
  //     res.status(400).send(e);
  //   }
  // })
  routerPost.get("/", async (req, res) => {
    const username = req.query.user;
    try {
      let posts;
      if (username) {
        posts = await blogdetails.find({ username });
      }  else {
        posts = await blogdetails.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = routerPost;