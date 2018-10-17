const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Photos = require('../models/photos')

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
//show
router.get('/:id',(req, res) => {
  User.findById(req.params.id, (err, userFound) => {
    res.render('user/show.ejs', {
      user: userFound
    });
  });
});
//edit
router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (err, editUser) => {
    res.render('user/edit.ejs', {
      user: editUser
    });
  });
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

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, updateUser) => {
    res.redirect('/user');
    console.log(req.body, req.params.id)
  });
});

router.delete('/:id', (req, res) => {
  console.log('reached this first part')
  User.findOneAndDelete(req.params.id, (err, deletedUser) => {
    const photosIds = [];
    for(let i = 0; i < deletedUser.Photos.length; i++){
      photosIds.push(deletedUser.Photos[i].id);
      console.log('reach this part')
    }
    Photos.deleteMany({_id: {$in: photosIds}}, (err, data) => {
      res.redirect('/user');
      console.log('reached the end delete function')
    });
  });
});


module.exports = router;