const redisClient = require('../config/redis');

// ADD DEBUG LOGS (REMOVE LATER IF YOU WANT)
console.log('Cart controller loaded – Redis ready?', !!redisClient.get);

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // DEBUG: See wetin come
  console.log('Adding to cart:', { productId, quantity });

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ error: 'Valid productId required' });
  }

  try {
    // Get current cart or start fresh
    let cartData = await redisClient.get('cart');
    let cart = cartData ? JSON.parse(cartData) : { items: [], total: 0 };

    // Find existing item
    const existingItem = cart.items.find(
      item => item.productId === parseInt(productId)
    );

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.items.push({
        productId: parseInt(productId),
        quantity: parseInt(quantity)
      });
    }

    // Recalculate total
    const products = require('../utils/products');
    cart.total = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    // Save back to Redis
    await redisClient.set('cart', JSON.stringify(cart));

    res.json({
      success: true,
      message: "Added to cart!",
      cart
    });
  } catch (err) {
    console.error('Cart error:', err.message);
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    let cartData = await redisClient.get('cart');
    let cart = cartData ? JSON.parse(cartData) : { items: [], total: 0 };

    // Attach full product details
    const products = require('../utils/products');
    const detailedCart = {
      ...cart,
      items: cart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product || null
        };
      })
    };

    res.json({
      success: true,
      cart: detailedCart
    });
  } catch (err) {
    console.error('Get cart error:', err.message);
    res.status(500).json({ error: 'Failed to get cart', details: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await redisClient.del('cart');
    res.json({ success: true, message: "Cart cleared successfully!" });
  } catch (err) {
    console.error('Clear cart error:', err.message);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

module.exports = { addToCart, getCart, clearCart };