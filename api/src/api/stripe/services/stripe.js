// api/services/stripe.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  createCheckoutSession: async (lineItems, successUrl, cancelUrl) => {
    console.log("checkout session ran");
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      return session;
    } catch (error) {
      console.error("Stripe Error:", error);
      throw error;
    }
  },
};
