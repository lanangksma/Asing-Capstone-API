const firestore = require("../config/firebase");
const { nanoid } = require("nanoid");

const addFood = async (request, h) => {
  const { name, calories, proteins, carbohydrate, fat, image, id } =
    request.payload;

  if (!name || !calories || !proteins || !carbohydrate || !fat || !image) {
    const response = h.response({
      status: "fail",
      message: "All fields are required",
    });
    response.code(400);
    return response;
  }

  const foodSnapshot = await firestore
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
    calories,
    proteins,
    carbohydrate,
    fat,
    image,
  };

  await firestore.collection("foods").add(food);

  return {
    status: "success",
    message: "Food added successfully",
  };
};
