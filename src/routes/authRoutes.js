const authController = require("../controllers/authController");

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    options: {
      auth: false,
    },
    handler: authController.register,
  },
  {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
    },
    handler: authController.login,
  },
  {
    method: "GET",
    path: "/profile",
    handler: authController.profile,
  },
  {
    method: "POST",
    path: "/logout",
    handler: authController.logout,
  },
];

module.exports = authRoutes;
