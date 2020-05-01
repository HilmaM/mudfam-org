var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var NewBlog = new Schema (
  {
    blogger_name: {type: String},
    blog_comment: {type: String}
  }
)

module.exports = mongoose.model('NewBlog', NewBlog);