var sha1 = require('sha1');
var UserModel = require('../../models/user');

/**
 * Sgn in get
 */
exports.signin_get = [
  (req,res,next) => {
    return res.render('logging/login')
  }
];


/**
 * Signin Post
 */

exports.signin_post = [  (req, res, next) => {
  var u_sername = req.fields.u_sername;
  var user_passwd = req.fields.user_passwd;

  UserModel.getUserByUsername(u_sername)
    .then(function (user) {
      if (!u_sername) {
        req.flash('error', 'User does not exist!');
        return res.redirect('back');
      }
      if (sha1(user_passwd) !== user.user_passwd) {
        req.flash('error', 'Incorect password!');
        return res.redirect('back');
      }
      req.flash('success', 'Signin successful!');
      delete user.user_passwd;
      req.session.login(req.params.role)
        .then(()=>{
          req.session.user = user;
          res.redirect('/insurer');
        })
        .catch(e=>{next(e);});
    })
    .catch(function(e) {
      req.flash('error', 'Username does not exist!');
      res.redirect('back');
      next(e)
    });
}]; 
