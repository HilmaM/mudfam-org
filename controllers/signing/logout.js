exports.sign_out = [
  (req, res, next) => {
    req.session.user = null;
    req.flash('success', 'You have been logged out');
    res.redirect('/insurer/');
    req.session.destroy();
    return;
  }
];