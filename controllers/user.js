const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Photos = require('../models/photos')

//routes
router.get('/', async (req, res)=>{
  try{
    const getUser = await User.find({});
    res.render('user/index.ejs', {
      user: getUser
      })
  }catch(err){
    res.send(err)
  }
})
    
//new
router.get('/new', async (req, res) => {
  try{
    res.render('user/new.ejs');
  }catch(err){
    res.send(err)
  }
});
    
//show
router.get('/:id', async (req, res) => {
  try{
    const userFound = await User.findById(req.params.id);
    res.render('user/show.ejs', {
      user: userFound
    })
  } catch(err){
    res.send(err)
  }
});

//edit
router.get('/:id/edit', async (req, res) => {
  try{
    const editUser = await User.findById(req.params.id);
    res.render('user/edit.ejs', {
      user: editUser
    });
  }catch(err){
    res.send(err)
  }
});

//post
router.post('/', async (req, res) => {
  try{
    const createdUser = await User.create(req.body);
      if(err){
        console.log(err)
      } else {
        console.log(createdUser);
        res.redirect('/user')
      }
    } catch(err){
      res.send(err)
    }
});
 
//put
router.put('/:id', async (req, res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/user');
  }catch(err){
    res.send(err)
  }
});

//delete
router.delete('/:id', async (req, res) => {
  try{
    const deletedUser = await User.findOneAndDelete(req.params.id);
    const photosIds = [];
    for(let i = 0; i < deletedUser.Photos.length; i++){
      photosIds.push(deletedUser.Photos[i].id);
      console.log(photosIds,'reached')
    }
    
    const data = await Photos.deleteMany({_id: {$in: photosIds}});
    res.redirect('/user');
      console.log('reached the end delete function')
  }catch(err){
    res.send(err)
  }
});

module.exports = router;