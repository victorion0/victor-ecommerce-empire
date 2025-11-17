const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Welcome page
app.get('/', (req, res) => {
  res.send(`
    <div style="text-align:center; margin-top:80px; font-family:Arial;">
      <h1 style="color:#6366f1;">E-COMMERCE EMPIRE LIVE!</h1>
      <h2 style="color:#10b981;">Make 10m with Victor</h2>
      <p>API: <code>/api/products</code> | <code>/api/cart</code> | <code>/api/checkout</code></p>
      <div style="margin:30px;">
        <a href="/api/products" style="background:#6366f1; color:white; padding:15px 30px; text-decoration:none; border-radius:8px; font-size:18px;">SEE PRODUCTS</a>
      </div>
    </div>
  `);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`E-commerce Empire dey run for port ${PORT} – Make 10m with Victor!`);
});