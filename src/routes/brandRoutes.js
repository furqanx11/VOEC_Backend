const express = require('express');
const router = express.Router();

const {createBrand, getSingleBrand} = require('../controllers/brandController');
const {get_nearestBranch} = require('../utils/gps');

router.post('/create', createBrand);
router.get('/:id', getSingleBrand);
router.post('/get_nearestBranch', get_nearestBranch);

module.exports = router;