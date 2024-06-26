const { firestore } = require("../config/firestore");
const { generateToken } = require("../utils/jwt");
const hashPassword = require("../utils/hashPassword");
const crypto = require("crypto");
const InputError = require("../exceptions/InputError");
const { verifyToken } = require("../utils/jwt");

const register = async (request, h) => {
  try {
    const {
      email,
      password,
      fullName,
      heightCm,
      weightKg,
      ageYears,
      armCircumferenceCm,
    } = request.payload;

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
    const id = `userId-${crypto.randomUUID()}`;
    const createdAt = new Date().toISOString();
    const photoUrl = `https://source.boringavatars.com/beam/120/${email}?colors=b6d8c0,dadabd,fedcba`;

    const data = {
      id,
      email,
      password: `${salt}:${hash}`,
      photoUrl,
      fullName,
      heightCm: parseFloat(heightCm),
      weightKg: parseFloat(weightKg),
      ageYears: parseInt(ageYears),
      armCircumferenceCm: parseFloat(armCircumferenceCm),
      createdAt,
    };

    await firestore.collection("users").doc(id).set(data);

    return { status: "success", message: "User created successfully", data };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam membuat akun", 500);
  }
};

const login = async (request, h) => {
  try {
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
      photoUrl: user.photoUrl,
      fullName: user.fullName,
      photoUrl: user.photoUrl,
      weightKg: user.weightKg,
      heightCm: user.heightCm,
      ageYears: user.ageYears,
      armCircumferenceCm: user.armCircumferenceCm,
      token: token,
    };

    return { status: "success", message: "login successfully", loginResult };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan login", 500);
  }
};

const checkToken = async (request, h) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const blacklistSnapshot = await firestore
      .collection("blacklist")
      .where("token", "==", token)
      .get();

    if (!blacklistSnapshot.empty) {
      const response = h.response({
        status: "fail",
        message: "Token is blacklisted",
      });
      response.code(401);
      return response;
    }

    const decoded = verifyToken(token);
    return { status: "success", message: "Token is valid", decoded };
  } catch (error) {
    throw new Error("Terjadi kesalahan dalam mengecek token", 500);
  }
};

const profile = (request, h) => {
  return { user: request.auth.credentials.user };
};

const logout = async (request, h) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    await firestore
      .collection("blacklist")
      .add({ token, createdAt: new Date() });
    return h.response({ message: "Logged out successfully" }).code(200);
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan logout", 500);
  }
};

module.exports = { register, login, profile, logout, checkToken };
