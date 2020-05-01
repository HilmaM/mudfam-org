//Set up mongoose connection
var mongoose = require('mongoose');
var dburl = require('../config/default');
const { Schema } = require('mongoose');

mongoose.connect(dburl.mongodb, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

var Products = new Schema({
  product_name: { type: String },
  product_category: {type: String},
  description: { type: String },
  product_price: { type: String },
  product_image: { type: String }
});

Products.virtual('url').get(function(){
  return `/insurer/extensions/products/${this._id}`;
})

module.exports = mongoose.model('Products', Products);