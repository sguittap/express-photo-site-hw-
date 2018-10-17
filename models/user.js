const mongoose = require('mongoose');
const Photos = require('./photos');

const UserSchema = new mongoose.Schema({
    username:{type:String, required: true},
    password:{type:String, required: true},
    photos: [Photos.schema]
});
module.exports  = mongoose.model('User', UserSchema);
