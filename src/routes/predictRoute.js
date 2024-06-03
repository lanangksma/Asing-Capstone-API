const predictController = require("../controllers/predictController");

const predictRoute = [
  {
    method: "POST",
    path: "/predict",
    options: {
      payload: {
        allow: "multipart/form-data",
        maxBytes: 1024 * 1024 * 100,
        multipart: true,
      },
    },
    handler: predictController.predict,
  },
];

module.exports = predictRoute;
