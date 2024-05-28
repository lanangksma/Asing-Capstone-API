const foodsController = require("../controllers/foodsController");

const foodsRoutes = [
    {
        method: "POST",
        path: "/add",
        options: {
            auth: false,
        },
        handler: foodsController.addFood,
    },
    {
        method: "GET",
        path: "/find/{name}",
        options: {
            auth: false,
        },
        handler: foodsController.foodGetByName,
    },
];

module.exports = foodsRoutes;
