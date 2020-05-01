module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not logged in');
      return res.redirect('back');
    }
    next();
  },
  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('success', 'Has logged');
      return res.redirect('/insurer');
    }
    next();
  },
  checkIsAdmin: function checkIsAdmin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not logged in');
      return res.redirect('/insurer/logging/login');
    } else {
      if (!req.session.user.isAdmin) {
        req.flash('error', 'No Access');
        return res.redirect('back');
      }
    }
    next();
  }
};