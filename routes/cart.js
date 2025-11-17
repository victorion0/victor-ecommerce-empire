const express = require('express');
const router = express.Router();
const { addToCart, getCart, clearCart } = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/clear', clearCart);

module.exports = router;