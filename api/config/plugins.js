module.exports = () => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
      register: {
        allowedFields: ["firstName", "lastName", "bookings"],
      },
      login: {
        allowedFields: ["email", "password", "bookings"],
      },
      forgotPassword: {
        allowedFields: ["email"],
      },
      update: {
        allowedFields: ["firstName", "lastName", "bookings"],
      },
      delete: {
        allowedFields: ["firstName", "lastName", "bookings"],
      },
    },
  },
});
