const express = require('express');
const router = express.Router();
const path = require("path");

const {login} = require('../controllers/loginController');
const {signup} = require('../controllers/signUpController');
const {order_status} = require('../controllers/orderStatusController');
const {create, listing, getSingle, comparison} = require('../controllers/productController');
const {createBrand, getSingleBrand} = require('../controllers/brandController');
const {get_nearestBranch} = require('../utils/gps');



router.post('/product/create', create);
router.get('/product/all', listing);
router.get('/product/comparison', comparison);
router.get('/product/:id', getSingle);
router.post('/login', login);
router.post('/signup', signup);
router.get('/order_status/:id', order_status);
router.post('/get_nearestBranch', get_nearestBranch);
router.post('/brand/create', createBrand);
router.get('/brand/:id', getSingleBrand);


module.exports = router;