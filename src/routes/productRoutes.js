const express = require('express');
const router = express.Router();
const {create, listing, getSingle} = require('../controllers/productController');

router.post('/create', create);
router.get('/all', listing);
router.get('/:id', getSingle);

module.exports = router;