const express = require('express');
const router = express.Router();
const path = require("path");

const {login} = require('../controllers/loginController');
const {signup} = require('../controllers/signUpController');
const {order_status} = require('../controllers/orderStatusController');
const {create, listing, getSingle} = require('../controllers/productController');
const {get_nearestBranch} = require('../utils/gps');



router.post('/create', create);
router.get('/all', listing);
router.get('/:id', getSingle);
router.post('/login', login);
router.post('/signup', signup);
router.get('/order_status/:id', order_status);
router.post('/get_nearestBranch', get_nearestBranch);


module.exports = router;