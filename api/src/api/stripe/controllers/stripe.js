// api/controllers/stripe.js
module.exports = {
  async createCheckoutSession(ctx) {
    const { lineItems, successUrl, cancelUrl } = ctx.request.body;

    try {
      const session = await strapi.services.stripe.createCheckoutSession(
        lineItems,
        successUrl,
        cancelUrl,
      );
      ctx.send({ sessionId: session.id });
    } catch (error) {
      ctx.throw(400, "Unable to create checkout session");
    }
  },
};
