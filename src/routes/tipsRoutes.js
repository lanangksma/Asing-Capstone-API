const tipsController = require("../controllers/tipsController");

const tipsRoutes = [
    {
        method: "GET",
        path: "/tips/{id}",
        handler: tipsController.tipsGetById,
    },
    {
        method: "GET",
        path: "/tips",
        handler: tipsController.getAllTips,
    },
];

module.exports = tipsRoutes;
