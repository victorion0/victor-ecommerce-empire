const products = require('../utils/products');

const getProducts = (req, res) => {
  res.json({
    success: true,
    count: products.length,
    data: products
  });
};

const getProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: "Product not found"
    });
  }

  res.json({
    success: true,
    data: product
  });
};

module.exports = { getProducts, getProduct };