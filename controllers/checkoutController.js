const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // in kobo

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'ngn',
      payment_method_types: ['card'],
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPaymentIntent };