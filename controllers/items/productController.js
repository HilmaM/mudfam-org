var Products = require('../../models/product');
var fs = require('fs');
var path = require('path');
var CheckIsAdmin = require('../../middleware/check'); 

exports.products_list = [
  (req, res, next) => {
    var perPage = 12;
    var page = req.params.page || 1;

    Products.find()
      .sort([['product_category', 'ascending']])
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function (_err, list) {
        Products.countDocuments().exec(function(err, count){
          if(err){ return next(err); }
          res.render('extensions/products', {
            title: 'Insurance made simple!', 
            product_list: list,
            current_page: page,
            pages: Math.ceil(count / perPage)
          });
        })
      });
  }
];

/*
exports.product_get = [
  (req, res, next) => {
    res.render('extensions/products', {title: 'Insurance made simple!'});
  }
];*/

// POST 
exports.product_post = [ (req, res, next) => {
  var productData = {
    product_name: req.fields.product_name,
    product_category: req.fields.product_category,
    description: req.fields.description,
    product_price: req.fields.product_price,
    product_image: req.files.product_image.path.split(path.sep).pop()
  }

  var product = {
    product_name: productData.product_name,
    product_category: productData.product_category,
    description: productData.description,
    product_price: productData.product_price,
    product_image: productData.product_image
  };
  
  let checkProduct = Products.find(productData.product_name);

  if(!checkProduct.length) {
    Products.create(product)
      .then(function(result){
        product = result;
        console.log('success', 'product created');
        req.flash('success', 'product added!!!');
        res.redirect('back');
      })
      .catch(function(e){
        fs.unlink(req.files.product_image.path);
        if (e.message.match('E11000 duplicate key')) {
          console.log('error', 'duplicate name');
          //req.flash('error', 'Duplicate username! Try another one');
          return res.redirect('back');
        }
        next(e);
      });
  } else {
    console.log('error', 'name taken, try again');
    //req.flash('error', 'productname already taken. Try another!');
    res.redirect('back');
  }
}];

/**
 * EDIT USER
 */
exports.product_edit_post = [
  async (req,res,next) => {
    var admin = req.session.product._id;
    var productId = req.params.productId;
    var productData = {
      product_name: req.fields.product_name,
      product_category: req.fields.product_category,
      description: req.fields.description,
      product_price: req.fields.product_price,
      product_image: req.files.user_image.path.split(path.sep).pop()
    }
    Products.updateproductById(admin, productId, productData)
      .then( function(result){
        product = result;
        req.flash('success', 'Edited successfully!');
        res.redirect('back');
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
 
exports.product_delete_post = function(req, res, next) {
  var productId = req.params._id;
  var admin = req.session.user._id;

  Products.findByIdAndRemove(productId, admin, function deleteProduct() {
    //if(err) { return next(err); }
    res.redirect('/insurer/extensions/products');
  })
};
