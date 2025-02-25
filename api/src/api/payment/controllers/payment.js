"use strict";

/**
 * A set of functions called "actions" for `payment`
 */

module.exports = {
  async createPaymentSession(ctx) {
    console.log("payment session controller");
    try {
      const { priceId, quantity } = ctx.request.body;
      console.log("priceId", priceId);
      console.log("quantity", quantity);
      const session = await strapi
        .service("api::payment.payment")
        .createStripeSession(priceId, quantity);
      console.log("session inside controller", session);
      ctx.body = { id: session.id };
    } catch (error) {
      ctx.body = { error: error.message };
      ctx.status = 500;
    }
  },
};
