const googleAuthHandler = require("../handlers/googleAuthHandler");

const googleAuthRoutes = [
  {
    method: ["GET", "POST"],
    path: "/auth/google",
    options: {
      auth: "google",
      handler: googleAuthHandler.handleGoogleAuth,
    },
  },
];

module.exports = googleAuthRoutes;
