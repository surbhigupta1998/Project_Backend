const express = require('express');
const blogdetails = require('../Model/blog');
const postdetails = require('../Model/post')
const router = express.Router();
const Imagedetails = require('../Model/modelimages')
const multer  = require('multer')
console.log("adbdhjsbfhjdsbfjui");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('chal raha hai')
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })
//CREATE POST
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  console.log(req.file)
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

module.exports = router;