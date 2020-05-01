//Set up mongoose connection
var Blogpost = require('../lib/mongo').Blogpost;

module.exports = {
  create: function (blogpost) {
    return Blogpost.create(blogpost)
        //.exec();
  },
  getBlogpostByBlogposttitle: function (blog_title) {
    return Blogpost
      .findOne({ blog_title: blog_title })
      //.addCreatedAt()
        .exec();
  },
  getBlogpostByDefaultId: function(blogpost) {
    return Blogpost
      .findOne({ _id: blogpost})
        //.addCreatedAt()
        .exec(); 
  },
  findBlogpost: function(blog_title) {
    return Blogpost
      .find({blog_title: blog_title})
      .exec();
  },
  updateBlogpostById: function(admin,blogpostId, data){
    return Blogpost.update({admin: admin, _id: blogpostId}, {$set: data})
      .exec();
  }
}