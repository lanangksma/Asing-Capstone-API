const googleAuthHandler = require("../handlers/googleAuthHandler");

const googleAuthRoutes = [
  {
    method: ["GET", "POST"],
    path: "/auth/google",
    options: {
      auth: {
        mode: "try",
        strategy: "google",
      },
      handler: googleAuthHandler.handleGoogleAuth,
    },
  },
];

module.exports = googleAuthRoutes;
