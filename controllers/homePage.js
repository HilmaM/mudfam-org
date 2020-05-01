/**
 * home page
 */
exports.home_form = [
  (req, res, next) => {
    res.render('layouts/index', {
      title: 'Insurance made simple!',
      role: req.session.getRole()
    })
  }
];
