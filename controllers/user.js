const express = require('express');
const router = express.Router();
const User = require('../models/user')

//routes

router.get('/', (req, res)=>{
    User.find({}, (err, getUser)=>{
      res.render('User/index.ejs', {
        user: getUser
      });
    })
});










module.exports = router;