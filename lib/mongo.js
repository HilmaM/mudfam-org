var mongoose = require('mongoose');
var db = require('../config/default');

mongoose.connect(db.mongodb, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

exports.User = mongoose.model('User', {
  user_fname: { type: 'string' },
  user_sname: { type: 'string' }, 
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  user_address: { type: 'string' },
  user_email: { type: 'string' },
  user_phonenumber: { type: 'string' },
  u_sername: { type: 'string' },
  user_passwd: { type: 'string' },
  user_avatar: { type: 'string' },
  user_bio: { type: 'string' },
  isAdmin: { type: 'boolean' }
  //role: { type: 'string', enum: [ 'SuperUser', 'isAdmin', 'User', 'Student' ], default: 'User'} 
}); 

exports.Blogpost = mongoose.model('Blogpost', {
  bloger_name: {type: 'string'},
  bloger_email: { type: 'string' },
  blog_title : { type: 'string' },
  blog_message: { type: 'string' }
});

exports.Subscriber = mongoose.model('Subscriber', {
  subscriber_email: { type: 'string' }
});

exports.NewsArticle = mongoose.model('NewsArticle', {
  author_fname: { type: 'string' },
  author_lname: { type: 'string' },
  author_email: { type: 'string' },
  author_phone: { type: 'number' },
  news_title : { type: 'string' },
  news_message: { type: 'string' },
  news_pub_date: { type: 'string' }
});

exports.ContactUs = mongoose.model('ContactUs', {
  contact_name: {type: 'string'},
  contact_email: {type: 'string'},
  contact_message: {type: 'string'}
});