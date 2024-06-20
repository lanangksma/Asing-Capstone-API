const { firestore } = require("../config/firestore");

const historyData = async (request) => {
  const { id } = request.auth.credentials.user; // Mengambil id dari credentials.user

  try {
    const snapshot = await firestore
      .collection("users")
      .doc(id)
      .collection("predictions")
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return { data: [] };
    }

    const data = snapshot.docs.map((doc) => ({
      predictId: doc.id,
      history: doc.data(),
    }));

    return { data };
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Failed to load history data");
  }
};

module.exports = historyData;
