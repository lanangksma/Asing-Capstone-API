const tipsController = require("../controllers/tipsController");

const tipsRoutes = [
    {
        method: "GET",
        path: "/tips/{id}",
        handler: tipsController.tipsGetById,
    },
];

module.exports = tipsRoutes;
