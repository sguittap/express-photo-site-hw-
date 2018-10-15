const express = require('express');
const router = express.Router();
const User = require('../models/user')

//routes

router.get('/', (req, res)=>{
    User.find({}, (err, getUser)=>{
      res.render('user/index.ejs', {
        user: getUser
      });
    })
});

//new
router.get('/new', (req, res) => {
    res.render('user/new.ejs');
});

router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
      if(err){
        console.log(err)
      } else {
        console.log(createdUser);
        res.redirect('/user')
      }
    })
});










module.exports = router;