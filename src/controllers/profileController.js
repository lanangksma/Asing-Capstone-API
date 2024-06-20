const { firestore } = require("../config/firestore");

const progressProfile = async (request, h) => {
  const { user } = request.auth.credentials;
  const { progress } = request.payload;

  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    const userRef = firestore.collection("users").doc(user.id);
    const querySnapshot = await userRef
      .collection("progress")
      .where("timestamp.date", "==", formattedDate)
      .get();

    let progressId;

    if (querySnapshot.empty && querySnapshot.docs.length > 0) {
      progressId = querySnapshot.docs[0].id;
    } else {
      progressId = `progress_${formattedDate}`;
    }

    const data = {
      id: progressId,
      progress: `${progress} kkal`,
      timestamp: {
        date: formattedDate,
        time: formattedTime,
      },
    };

    if (!querySnapshot.empty && querySnapshot.docs.length > 0) {
      await userRef.collection("progress").doc(progressId).update(data);
    } else {
      await userRef.collection("progress").doc(progressId).set(data);
    }

    return h
      .response({
        status: "success",
        result: { ...data },
      })
      .code(200);
  } catch (error) {
    console.error("Error updating progress:", error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan saat memperbarui progres",
      })
      .code(500);
  }
};

const getProgress = async (request, h) => {
  const { user } = request.auth.credentials;

  try {
    const userRef = firestore.collection("users").doc(user.id);
    const progressSnapshot = await userRef.collection("progress").get();

    const progressList = [];
    progressSnapshot.forEach((doc) => {
      const progressData = doc.data();
      progressList.push({
        id: doc.id,
        progress: progressData.progress,
        timestamp: progressData.timestamp,
      });
    });

    return h
      .response({
        status: "success",
        result: progressList,
      })
      .code(200);
  } catch (error) {
    if (error.code === 400) {
      console.error("Bad request:", error);
      return h
        .response({
          status: "error",
          message: "Permintaan tidak valid",
        })
        .code(400);
    } else {
      console.error("Error fetching progress:", error);
      return h
        .response({
          status: "error",
          message: "Terjadi kesalahan saat mengambil progres",
        })
        .code(500);
    }
  }
};

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

module.exports = { updateProfile, progressProfile, getProgress };
