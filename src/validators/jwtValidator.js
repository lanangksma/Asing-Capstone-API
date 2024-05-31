const { firestore } = require("../config/firestore");
const { verifyToken } = require("../utils/jwt");

const validate = async (artifacts, request, h) => {
  try {
    const decoded = verifyToken(artifacts.token);
    if (!decoded) {
      return { isValid: false };
    }

    // Check if token is blacklisted
    const blacklistSnapshot = await firestore
      .collection("blacklist")
      .where("token", "==", artifacts.token)
      .get();
    if (!blacklistSnapshot.empty) {
      return { isValid: false };
    }

    const userSnapshot = await firestore
      .collection("users")
      .doc(decoded.decoded.payload.id)
      .get();
    if (!userSnapshot.exists) {
      return { isValid: false };
    }

    return { isValid: true, credentials: { user: userSnapshot.data() } };
  } catch (error) {
    console.error("Token validation error:", error);
    return { isValid: false };
  }
};

module.exports = { validate };
