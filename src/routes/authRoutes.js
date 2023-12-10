const express = require('express');
const router = express.Router();
const {login} = require('../controllers/loginController');
const {signup} = require('../controllers/signUpController');
const {order_status} = require('../controllers/orderStatusController');

router.post('/login', login);
router.post('/signup', signup);
router.get('/order_status/:id', order_status);

module.exports = router;