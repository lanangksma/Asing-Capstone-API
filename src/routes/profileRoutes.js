const profileHandler = require("../controllers/profileController");

const profileRoutes = [
  {
    method: "POST",
    path: "/profile",
    handler: profileHandler.updateProfile,
    options: {
      auth: {
        mode: "required",
        strategy: "jwt",
      },
    },
  },
  {
    method: "POST",
    path: "/progress",
    handler: profileHandler.progressProfile,
    options: {
      auth: {
        mode: "required",
        strategy: "jwt",
      },
    },
  },
  {
    method: "GET",
    path: "/progress",
    handler: profileHandler.getProgress,
    options: {
      auth: {
        mode: "required",
        strategy: "jwt",
      },
    },
  },
];

module.exports = profileRoutes;
