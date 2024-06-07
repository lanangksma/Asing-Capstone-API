const foodsController = require("../controllers/foodsController");

const foodsRoutes = [
    {
        method: "POST",
        path: "/add",
        handler: foodsController.addFood,
    },
    {
        method: "GET",
        path: "/food/{id}",
        handler: foodsController.foodGetById,
    },
    {
        method: "POST",
        path: "/addmany",
        handler: foodsController.addFoods,
    },
];

module.exports = foodsRoutes;
