const mongoose = require('mongoose');

const PhotosSchema = new mongoose.Schema({
    Title: String,
    Image: String,
});
module.exports  = mongoose.model('Photos', PhotosSchema);