module.exports = () => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
      register: {
        allowedFields: ["firstName", "lastName", "bookings", "reviews"],
      },
      login: {
        allowedFields: ["email", "password", "bookings", "reviews"],
      },
      forgotPassword: {
        allowedFields: ["email"],
      },
      update: {
        allowedFields: ["firstName", "lastName", "bookings", "reviews"],
      },
      delete: {
        allowedFields: ["firstName", "lastName", "bookings", "reviews"],
      },
    },
  },
});
