const express = require('express');
const router = express.Router();
const Photos = require('../models/photos')
const User = require('../models/user')
//index
router.get('/', async (req, res)=>{
  try{
    const foundPhotos = await Photos.find({});
    res.render('photos/index.ejs', {
        photos: foundPhotos
      })
    } catch(err){
      res.send(err)
    }
})
//new
router.get('/new', async (req, res)=>{
  try{
    const allPhotos = await Photos.find({});
    res.render('photos/new.ejs',{
      photos: allPhotos
    })
  } catch(err){
    res.send(err)
  }
})
//show
router.get('/:id', async (req, res)=>{
  try{
    const foundPhotos = await Photos.findById(req.params.id);
    const foundUser =  await User.findOne({'photos._id': req.params.id});
    res.render('photos/show.ejs', {
      photos: foundPhotos,
      user: foundUser
    })
  } catch(err){
    res.send(err)
  }
})
//edit
router.get('/:id/edit', async (req, res)=>{
  try{
    const foundPhotos = await Photos.findById(req.params.id);
    const allUser = await User.find({});
    const foundPhotoUser = await User.findOne({'photos._id': req.params.id});
    res.render('photos/edit.ejs', {
      photos: foundPhotos,
      users: allUser,
      photosUser: foundPhotoUser
      })
  } catch(err){
    res.send(err)
  }
})

//post
router.post('/', async (req, res)=>{
  try{
    const foundUser = await User.findById(req.body.userId);
    const createdPhotos = await Photos.create(req.body);
    foundUser.photos.push(createdPhotos);
      await foundUser.save();
      res.redirect('/photos')
    }catch(err){
      res.send(err)
    }
})

//delete
router.delete('/:id', async (req, res)=>{
  try{
    const deletedPhotos = await Photos.findByIdAndRemove(req.params.id);
    const foundUser = await User.findOne({'photos._id': req.params.id});
    foundUser.Photos.id(req.params.id).remove();
        foundUser.save((err, data) => {
           res.redirect('/photos');
            })
    }catch(err){
      res.send(err)
    }
})
//put
//i tried jims method out
router.put('/:id', async (req, res)=>{
  try{
    const updatedPhotos = await Photos.findOneAndUpdate(req.params.id, req.body, {new: true});
    const foundUser = await User.findOne({'photos._id': req.params.id});
      if(foundUser._id.toString() !== req.body.UserId){
        foundUser.Photos.id(req.params.id).remove()
        await foundUser.save()
        const newUser = await User.findById(req.body.UserId)
            newUser.Photos.push(updatedPhotos);
            await newUser.save()
              res.redirect('/photos')
      } else {
          foundUser.Photos.id(req.params.id).remove();
          foundUser.Photos.push(updatedPhotos);
          await foundUser.save()
            res.redirect('/photos');
          };
        
  }catch(err){
  res.send(err)
  }
})
module.exports = router;