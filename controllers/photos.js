const express = require('express');
const router = express.Router();
const Photos = require('../models/photos')
const User = require('../models/user')

router.get('/', (req, res)=>{
    Photos.find({}, (err, foundPhotos)=>{
      res.render('photos/index.ejs', {
        photos: foundPhotos
      });
    })
});
  
  
router.get('/new', (req, res) => {
    Photos.find({}, (err, allPhotos) => {
      res.render('photos/new.ejs', {
        photos: allPhotos
      });
    })
})

router.get('/:id', (req, res)=>{
    Photos.findById(req.params.id, (err, foundPhotos)=>{
      User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
        console.log(foundUser)
          res.render('photos/show.ejs', {
            photos: foundPhotos,
            user: foundUser
          });
      });
    });
});

router.get('/:id/edit', (req, res)=>{
    Photos.findById(req.params.id, (err, foundPhotos) => {
        User.find({}, (err, allUser) => {
            User.findOne({'photos._id': req.params.id}, (err, foundPhotosUser) => {
                res.render('photos/edit.ejs', {
                    photos: foundPhotos,
                    users: allUsers,
                    photosUser: foundPhotosUser
                    });
                });
            });
        });
});

router.post('/', (req, res)=>{
    User.findById(req.body.userId, (err, foundUser) => {
        Photos.create(req.body, (err, createdPhotos) => {
            foundUser.photos.push(createdPhotos);
            foundUser.save((err, data) => {
              res.redirect('/photos')
                });
        });
    });
});

router.delete('/:id', (req, res)=>{
    Photos.findByIdAndRemove(req.params.id, (err, deletedPhotos)=>{
      User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
        foundUser.Photos.id(req.params.id).remove();
        foundUser.save((err, data) => {
           res.redirect('/photos');
            });
      })
    });
});

router.put('/:id', (req, res)=>{
    Article.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, updatedArticle)=>{
      User.findOne({'Photos._id': req.params.id}, (err, foundUser) => {
        if(foundUser._id.toString() !== req.body.UserId){
          foundUser.Photos.id(req.params.id).remove()
          foundUser.save((err, savedFoundUser) => {
            User.findById(req.body.UserId, (err, newUser) => {
              newUser.Photos.push(updatedArticle);
              newUser.save((err, savedNewUser) => {
                res.redirect('/Photos');
              });
            });
          });
        } else {
            foundUser.Photos.id(req.params.id).remove();
            foundUser.Photos.push(updatedArticle);
            foundUser.save((err, data) => {
              res.redirect('/Photos');
            });
        } 
      });
    });
});


module.exports = router;