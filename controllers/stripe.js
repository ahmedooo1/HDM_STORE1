require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.charge = async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'euro',
      description: 'Frais de service',
      source: token,
    });

    res.json({ success: true, charge });
  } catch (error) {
    console.error('Erreur lors de la création de la transaction:', error);
    res.status(500).json({ success: false, error });
  }
};
