const mongoose = require('mongoose');
const postSchema = require('../Schema/postSchema');



const Post = mongoose.model('post' , postSchema);

module.exports = Post;