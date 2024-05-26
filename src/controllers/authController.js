const firestore = require("../config/firestore");
const { generateToken } = require("../utils/jwt");
const hashPassword = require("../utils/hashPassword");
const crypto = require("crypto");

const register = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    const response = h.response({
      status: "fail",
      message: "Email and password are required fields",
    });
    response.code(400);
    return response;
  }

  if (password.length < 8) {
    const response = h.response({
      status: "fail",
      message: "Password should be at least 8 characters long",
    });
    response.code(400);
    return response;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const response = h.response({
      status: "fail",
      message: "Invalid email format",
    });
    response.code(400);
    return response;
  }

  const userSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  if (!userSnapshot.empty) {
    const response = h.response({
      status: "fail",
      message: "User already exists",
    });
    response.code(409);
    return response;
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const photoUrl = `api.multiavatar.com/${email}.svg`;

  const data = {
    id,
    email,
    password: `${salt}:${hash}`,
    photoUrl,
    createdAt,
  };

  await firestore.collection("users").doc(id).set(data);

  return { status: "success", message: "User created successfully", data };
};

const login = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    const response = h.response({
      status: "fail",
      message: "Email and password are required fields",
    });
    response.code(400);
    return response;
  }

  const userSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  if (userSnapshot.empty) {
    const response = h.response({
      status: "fail",
      message: "User not found",
    });
    response.code(401);
    return response;
  }

  const user = userSnapshot.docs[0].data();

  if (!user) {
    const response = h.response({
      status: "fail",
      message: "Invalid email or password",
    });
    response.code(401);
    return response;
  }

  const [storedSalt, storedHash] = user.password.split(":");
  const hash = hashPassword(password, storedSalt);

  if (hash !== storedHash) {
    const response = h.response({
      status: "fail",
      message: "Invalid email or password",
    });
    response.code(401);
    return response;
  }

  const token = generateToken({ id: user.id, email: user.email });

  const loginResult = {
    userId: user.id,
    email: user.email,
    token: token,
  };

  return { status: "success", message: "login successfully", loginResult };
};

const profile = (request, h) => {
  const token = request.headers.authorization.split(" ")[1];

  return { user: request.auth.credentials.user, token };
};

const logout = async (request, h) => {
  const token = request.headers.authorization.split(" ")[1];
  await firestore.collection("blacklist").add({ token, createdAt: new Date() });
  return h.response({ message: "Logged out successfully" }).code(200);
};

module.exports = { register, login, profile, logout };
