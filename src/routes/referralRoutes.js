const express = require('express');
const router = express.Router();
const { addReferralPoints } = require('../controllers/referralController');

router.put('/', addReferralPoints);

module.exports = router;
