const express = require('express');
const router = express.Router();

const {create, listing, getSingle, comparison, createFeedback} = require('../controllers/productController');
const {order_status} = require('../controllers/orderStatusController');

router.post('/create', create);
router.get('/all', listing);
router.get('/comparison', comparison);
router.get('/:id', getSingle);
router.get('/order_status/:id', order_status);
router.post('/feedback', createFeedback);

module.exports = router;