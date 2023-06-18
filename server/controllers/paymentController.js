import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce App",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
};

export const sendStripeApiKey = (req, res) => {
  res.status(200).send({ stripeApiKey: process.env.STRIPE_API_KEY });
};
