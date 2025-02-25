"use strict";

/**
 * payment service
 */

const stripe = require("stripe")(
  "sk_test_51QnhtoA4CT0xAsLNGnKOEeloSIhBWvKzjDYiog0Zvg2ZdLx8AL1JEY1iiHyl8Wbfy2Pn7Mbnja23hE9vr3s49Z2V00o2lwozIN",
);

module.exports = () => ({
  async createStripeSession(priceId, quantity) {
    console.log("stripe", stripe);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    console.log("session inside service", session);
    return session;
  },
});
