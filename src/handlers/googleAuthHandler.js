const firestore = require("../config/firestore");
const { generateToken } = require("../utils/jwt");

const handleGoogleAuth = async (request, h) => {
  if (!request.auth.isAuthenticated) {
    return h.response("Authentication failed").code(401);
  }

  // Extract user details from Google profile
  const profile = request.auth.credentials.profile;
  const email = profile.email;

  // Check if user exists in the Firestore
  const userSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  let userId;
  if (userSnapshot.empty) {
    // If user does not exist, create new user
    const newUser = {
      email: email,
      name: profile.displayName,
      photoUrl: profile.raw.picture,
    };
    const userRef = await firestore.collection("users").add(newUser);
    userId = userRef.id;
  } else {
    // If user exists, use existing user id
    userId = userSnapshot.docs[0].id;
  }

  // Generate JWT token
  const token = generateToken({ id: userId, email: email });

  // Redirect to profile with token
  return h.redirect(`/profile?token=${token}`);
};

module.exports = { handleGoogleAuth };
