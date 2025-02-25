module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment",
      handler: "payment.createPaymentSession",
    },
  ],
};
