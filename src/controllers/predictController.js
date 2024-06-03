const predictClassification = require("../config/inference");
const { firestore } = require("../config/firestore");

const predict = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { id } = request.auth.credentials.user;

  // console.log("UID: ", id); debug

  try {
    const { confidenceScore, predictedLabel } = await predictClassification(
      model,
      image
    );

    const userSnapshot = await firestore.collection("users").doc(id).get();
    const user = userSnapshot.data();

    const prediction = {
      confidenceScore,
      predictedLabel,
      userId: id,
      userEmail: user.email,
      userFullName: user.fullName,
      createdAt: new Date().toISOString(),
    };

    await firestore.collection("predictions").add(prediction);

    return {
      status: "success",
      data: prediction,
    };
  } catch (error) {
    return {
      status: "fail",
      message: error.message,
    };
  }
};

module.exports = { predict };
