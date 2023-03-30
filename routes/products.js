const express = require('express');
const router = express.Router();

const {getallProducts, getallProductsStatic} = require('../controllers/products.js');

router.route('/').get(getallProducts);
router.route('/static').get(getallProductsStatic);

module.exports = router;