const express = require('express');
const router = express.Router();
const {get, update, updatePassword} = require('../controllers/userController');

router.put('/:id', update);
router.get('/:id', get);
router.put('/password/:id', updatePassword);
// router.post('/referral', addReferralPoints);
 

module.exports = router;