const express = require('express');
const router = express.Router();

const {login} = require('../controllers/loginController');
const {signup} = require('../controllers/signUpController');


router.post('/login', login);
router.post('/signup', signup);


module.exports = router;