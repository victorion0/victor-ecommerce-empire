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
    <div class="astra-ecommerce-hero" style="
  text-align: center;
  padding: 160px 20px 140px;
  max-width: 960px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.07);
  position: relative;
  overflow: hidden;
">
  <h1 style="
    font-size: 64px;
    font-weight: 900;
    color: #1a1a1a;
    margin: 0 0 16px;
    line-height: 1.05;
    letter-spacing: -1.8px;
  ">
    E-COMMERCE EMPIRE LIVE!
  </h1>

  <h2 style="
    font-size: 42px;
    font-weight: 800;
    color: #0274be;            /* Astra official 2025 primary */
    margin: 0 0 36px;
  ">
    Make 10m with Victor
  </h2>

  <p style="
    font-size: 22px;
    color: #555d66;
    margin-bottom: 56px;
    line-height: 1.7;
  ">
    API endpoints:
    <code style="background:#e3f2ff; color:#0274be; padding:6px 12px; border-radius:8px; font-weight:600; margin:0 4px;">/api/products</code> |
    <code style="background:#e3f2ff; color:#0274be; padding:6px 12px; border-radius:8px; font-weight:600; margin:0 4px;">/api/cart</code> |
    <code style="background:#e3f2ff; color:#0274be; padding:6px 12px; border-radius:8px; font-weight:600; margin:0 4px;">/api/checkout</code>
  </p>

  <div style="margin: 56px 0;">
    <a href="/api/products" class="astra-cta-button" style="
      display: inline-block;
      background: #0274be;
      color: #ffffff !important;
      font-size: 20px;
      font-weight: 700;
      padding: 18px 52px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 12px 35px rgba(2,116,190,0.32);
      transition: all 0.4s ease;
      letter-spacing: 0.5px;
    ">
      SEE PRODUCTS →
    </a>
  </div>

  <p style="
    margin-top: 90px;
    color: #8898aa;
    font-size: 16px;
    font-weight: 500;
  ">
    Built by Victor • 2025
  </p>
</div>

<!-- Astra-perfect hover glow (add to Astra → Customizer → Additional CSS) -->
<style>
  .astra-cta-button:hover {
    background: #015f9e;
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(2,116,190,0.42);
  }
  @media (max-width: 768px) {
    .astra-ecommerce-hero h1 { font-size: 48px; }
    .astra-ecommerce-hero h2 { font-size: 34px; }
    .astra-ecommerce-hero { padding: 120px 20px; }
  }
</style>
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