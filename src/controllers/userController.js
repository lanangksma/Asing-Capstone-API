const firestore = require("../config/firestore");

const updateProfile = async (request, h) => {
  const { user } = request.auth.credentials;
  const { name, photoUrl } = request.payload;

  if (!name && !photoUrl) {
    const response = h.response({
      status: "fail",
      message: "Name or photoUrl is required",
    });
    response.code(400);
    return response;
  }

  const data = {};
  if (name) {
    data.name = name;
  }
  if (photoUrl) {
    data.photoUrl = photoUrl;
  }

  await firestore.collection("users").doc(user.id).update(data);

  return { status: "success" };
};

module.exports = { updateProfile };
