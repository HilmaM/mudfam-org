var express = require('express');
var router = express.Router();

// Require the controllers
/** Signing controllers */
const user_controller = require('../controllers/signing/signup');
const user_login = require('../controllers/signing/login');
const log_out = require('../controllers/signing/logout');
/** home page controller */
const home_controller = require('../controllers/homePage');
const contact_us = require('../controllers/items/contactusController');
const miscel = require('../controllers/items/miscel');
const product_page = require('../controllers/items/productController');

/** 
 * HOME PAGE REDRECT ROUTE
 */
router.get('/', home_controller.home_form);
// Register user get route 
router.get('/logging/signup', user_controller.signup_get);
// Register user post route 
router.post('/logging/signup', user_controller.signup_post);
// Login get route
router.get('/logging/login', user_login.signin_get);
// Login post route with username
router.post('/logging/login', user_login.signin_post);
// User logout get route
router.get('/logging/logout', log_out.sign_out);
router.get('/extensions/about', miscel.ab_t);
router.get('/extensions/projects', miscel.com_page);
router.get('/extensions/contactus', contact_us.contact_get);
router.post('/extensions/contactus', contact_us.contact_post);
router.get('/extensions/products', product_page.products_list);
router.post('/products', product_page.product_post);
router.post("/extensions/:productId/remove", product_page.product_delete_post);

/**
 * Subscribers, emails
 * 
router.post('/subscribe/create', subs.subs_post);
 */

module.exports = router;