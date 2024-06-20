const predictController = require("../controllers/predictController");
const historyData = require("../controllers/historyController");

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
  {
    method: "GET",
    path: "/history",
    handler: historyData,
  },
];

module.exports = predictRoute;
