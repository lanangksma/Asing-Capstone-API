const { firestore } = require("../config/firestore");

const updateProfile = async (request, h) => {
  const { user } = request.auth.credentials;
  const { fullName, ageYears, weightKg, armCircumferenceCm, heightCm } =
    request.payload;

  const dataValidation = {
    fullName,
    ageYears,
    weightKg,
    armCircumferenceCm,
    heightCm,
  };

  if (!dataValidation) {
    const response = h.response({
      status: "fail",
      message: "Please fill all required",
    });
    response.code(400);
    return response;
  }

  const data = {
    fullName: fullName,
    ageYears: ageYears,
    weightKg: weightKg,
    armCircumferenceCm: armCircumferenceCm,
    heightCm: heightCm,
  };

  // if (!name && !photoUrl) {
  //   const response = h.response({
  //     status: "fail",
  //     message: "Name or photoUrl is required",
  //   });
  //   response.code(400);
  //   return response;
  // }

  // const data = {};
  // if (name) {
  //   data.name = name;
  // }
  // if (photoUrl) {
  //   data.photoUrl = photoUrl;
  // }

  await firestore.collection("users").doc(user.id).update(data);

  return { status: "success", result: { ...data } };
};

module.exports = { updateProfile };
