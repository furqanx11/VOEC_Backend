const express = require('express');
const router = express.Router();
const { make_payment } = require('../controllers/paymentsController');

router.post('/', make_payment);

module.exports = router;
