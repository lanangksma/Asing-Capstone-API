const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "dragon-frost",
  databaseId: "users",
});

const fs_food = new Firestore({
  projectId: "dragon-frost",
  databaseId: "food-nutrition",
});

const fs_tips = new Firestore({
  projectId: "dragon-frost",
  databaseId: "tips",
})

module.exports = { firestore, fs_food, fs_tips };
