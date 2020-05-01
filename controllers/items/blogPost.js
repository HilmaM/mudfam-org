var BlogModel = require('../../models/blogpost');

/*/ GET 
exports.blogpost_get = function (req, res, next) {
  BlogModel.findBlogpost({blog_title:'blog_ttle'})
    .then(function (err, results) {
      if(err){ return next(err); }
      res.render('itm/blogpost', {title: 'Basilwizi- people of the great river', blogs: results});
    });
};*/

exports.blogpost_get = function (req,res,next) {
  res.render('itm/blogpost', {title: 'Basilwizi- people of the great river'});
};

// POST
exports.blog_post = [ (req, res, next) => {
  var blogData = {
    bloger_name: req.fields.bloger_name,
    bloger_email: req.fields.bloger_email,
    blog_title: req.fields.blog_title,
    blog_message: req.fields.blog_message
  }

  var blogpost = {
    bloger_name: blogData.bloger_name,
    bloger_email: blogData.bloger_email,
    blog_title: blogData.blog_title,
    blog_message: blogData.blog_message
  };

  BlogModel.create(blogpost)
    .then(function(result){
      blogpost = result;
      console.log('success', 'Blogpost created')
      req.flash('success', 'Blogpost created');
      res.redirect('back');
    })
    .catch(function(e){
      if(e.message){
        console.log('error', e)
        req.flash('error', e);
        res.redirect('back');
      }
      next(e);
    });
}];

/**
 * EDIT 
 */
exports.blogpost_edit_post = [
  async (req,res,next) => {
    var admin = req.session.blogpost._id;
    var blogpostId = req.params.blogpostId;
    var blogData = {
      bloger_name: req.fields.bloger_name,
      blog_title: req.fields.blog_title,
      blog_message: req.fields.blog_message,
      bloger_email: req.fields.bloger_email
    }
    BlogModel.updateUserById(admin, blogpostId, blogData)
      .then( function(result){
        blogpost = result.ops[0];
        req.flash('success', 'Edited successfully!');
        res.redirect('/');
      })
      .catch(function(e){
        if(e){ 
          req.flash('error', e)
          res.redirect('back');
        } 
        next(e);
      });
  } 
];
