module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  {
    name: "strapi::session",
    config: {
      cookie: {
        httpOnly: false, // Allow JavaScript access for testing
        secure: false, // Allow HTTP for local development
        sameSite: "lax", // Common development setting
        maxAge: 1000 * 60 * 60 * 24, // 24 hours - shorter duration for testing
        domain: "localhost", // Local development domain
      },
      rolling: true,
      renew: true,
    },
  },
  "strapi::favicon",
  "strapi::public",
];
