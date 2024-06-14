const foodsController = require("../controllers/foodsController");

const foodsRoutes = [
  {
    method: "POST",
    path: "/add",
    handler: foodsController.addFood,
  },
  {
    method: "GET",
    path: "/food/id/{id}",
    handler: foodsController.foodGetById,
  },
  {
    method: "POST",
    path: "/addmany",
    handler: foodsController.addFoods,
  },
  {
    method: "GET",
    path: "/food",
    handler: foodsController.foodGetByName,
  },
];

module.exports = foodsRoutes;
