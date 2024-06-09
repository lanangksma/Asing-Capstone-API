const predictClassification = require("../config/inference");
const { firestore } = require("../config/firestore");
const { generateId } = require("../utils/myId");
const InputError = require("../exceptions/InputError");

const predict = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { id } = request.auth.credentials.user;

  try {
    const { recommendation, predictedClassName, confidenceScore } =
      await predictClassification(model, image);

    const userSnapshot = await firestore.collection("users").doc(id).get();
    const user = userSnapshot.data();
    const predictId = `predict_${generateId()}`;

    const prediction = {
      id: predictId,
      predictedClassName,
      recommendation,
      confidenceScore,
      userId: id,
      userEmail: user.email,
      userFullName: user.fullName,
      createdAt: new Date().toISOString(),
    };

    const userRef = firestore.collection("users").doc(id);
    await userRef.collection("predictions").doc(predictId).set(prediction);

    return {
      status: "success",
      data: prediction,
    };
  } catch (error) {
    throw new InputError(`Error when predicting image: ${error.message}`);
  }
};

module.exports = { predict };
