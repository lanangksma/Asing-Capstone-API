const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "dragon-frost",
  databaseId: "users",
});

const fs_food = new Firestore({
  projectId: "dragon-frost",
  databaseId: "food-nutrition",
});

module.exports = { firestore, fs_food };
