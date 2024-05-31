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
];

module.exports = profileRoutes;
