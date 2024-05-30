const foodsController = require("../controllers/foodsController");

const foodsRoutes = [
    {
        method: "POST",
        path: "/add",
        handler: foodsController.addFood,
    },
    {
        method: "GET",
        path: "/food/{name}",
        handler: foodsController.foodGetByName,
    },
];

module.exports = foodsRoutes;
