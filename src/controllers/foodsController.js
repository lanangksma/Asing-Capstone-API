const { fs_food } = require("../config/firestore");

const addFood = async (request, h) => {
  const { name, calories, proteins, carbohydrate, fat, id } = request.payload;

  if (!id || !name || !calories || !proteins || !carbohydrate || !fat) {
    const response = h.response({
      status: "fail",
      message: "All fields are required",
    });
    response.code(400);
    return response;
  }

  const foodSnapshot = await fs_food
    .collection("foods")
    .where("name", "==", name)
    .get();

  if (!foodSnapshot.empty) {
    const response = h.response({
      status: "fail",
      message: "Food already exists",
    });
    response.code(409);
    return response;
  }

  const food = {
    name,
    id,
    calories: parseFloat(calories),
    proteins: parseFloat(proteins),
    carbohydrate: parseFloat(carbohydrate),
    fat: parseFloat(fat),
  };

  await fs_food.collection("foods").add(food);

  return {
    status: "success",
    message: "Food added successfully",
  };
};

const addFoods = async (request, h) => {
  const foodsToAdd = request.payload; // Assuming request.payload is an array of food objects

  if (!Array.isArray(foodsToAdd) || foodsToAdd.length === 0) {
    const response = h.response({
      status: "fail",
      message: "Payload should be a non-empty array of food objects",
    });
    response.code(400);
    return response;
  }

  const validationErrors = foodsToAdd.some((food) => {
    return (
      !food.id ||
      !food.name ||
      typeof food.calories !== "number" ||
      typeof food.proteins !== "number" ||
      typeof food.fat !== "number" ||
      typeof food.carbohydrate !== "number" ||
      food.calories < 0 ||
      food.proteins < 0 ||
      food.fat < 0 ||
      food.carbohydrate < 0
    );
  });

  if (validationErrors) {
    const response = h.response({
      status: "fail",
      message:
        "All fields are required for each food object and must be valid. 'calories', 'proteins', 'fat', and 'carbohydrate' must be non-negative numbers.",
    });
    response.code(400);
    return response;
  }

  const existingFoodNames = new Set();
  const existingFoodsSnapshot = await fs_food.collection("foods").get();

  existingFoodsSnapshot.forEach((doc) => {
    existingFoodNames.add(doc.data().name.toLowerCase());
  });

  const duplicateFoodNames = foodsToAdd.filter((food) =>
    existingFoodNames.has(food.name.toLowerCase())
  );

  if (duplicateFoodNames.length > 0) {
    const response = h.response({
      status: "fail",
      message: "Some foods already exist",
      duplicates: duplicateFoodNames.map((food) => food.name),
    });
    response.code(409);
    return response;
  }

  const batch = fs_food.batch();

  foodsToAdd.forEach((food) => {
    batch.set(fs_food.collection("foods").doc(), food);
  });

  await batch.commit();

  return {
    status: "success",
    message: "Foods added successfully",
  };
};

const foodGetByName = async (request, h) => {
  try {
    const { name } = request.params;

    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Name is required",
      });
      response.code(400);
      return response;
    }

    const foodSnapshot = await fs_food
      .collection("foods")
      .where("name", "==", name)
      .get();

    if (foodSnapshot.empty) {
      const response = h.response({
        status: "fail",
        message: "Food not found",
      });
      response.code(404);
      return response;
    }

    const food = foodSnapshot.docs[0].data();

    return {
      status: "success",
      data: food,
    };
  } catch (error) {
    throw new InputError(
      "Terjadi kesalahan dalam mendapatkan nama makanan",
      500
    );
  }
};

module.exports = { addFood, foodGetByName, addFoods };
