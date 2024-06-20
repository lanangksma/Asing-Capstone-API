const predictClassification = require("../config/inference");
const { Storage } = require("@google-cloud/storage");
const { firestore } = require("../config/firestore");
const { generateId } = require("../utils/myId");
const InputError = require("../exceptions/InputError");

const storage = new Storage();
const bucketName = "predict-history-asing";

const uploadImageToStorage = async (imageBuffer, filename) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(filename);

  // Import file-type secara dinamis
  const fileType = await import("file-type");
  const type = await fileType.fileTypeFromBuffer(imageBuffer);
  if (!type) {
    throw new InputError("Invalid image file type");
  }

  const stream = file.createWriteStream({
    metadata: {
      contentType: type.mime,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      try {
        await file.makePublic(); // Membuat file bisa diakses secara publik
        resolve(`https://storage.googleapis.com/${bucketName}/${filename}`);
      } catch (err) {
        reject(err);
      }
    });

    stream.end(imageBuffer);
  });
};

const predict = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { id } = request.auth.credentials.user;

  try {
    const { recommendation, predictedClassName, confidenceScore } =
      await predictClassification(model, image);

    const userSnapshot = await firestore.collection("users").doc(id).get();
    const user = userSnapshot.data();
    const predictId = `predict_${generateId()}`;

    // Upload image to Google Cloud Storage
    const fileType = await import("file-type");
    const type = await fileType.fileTypeFromBuffer(image);
    if (!type) {
      throw new InputError("Invalid image file type");
    }
    const filename = `${predictId}.${type.ext}`;
    const imageUrl = await uploadImageToStorage(image, filename);

    const prediction = {
      id: predictId,
      predictedClassName,
      recommendation,
      confidenceScore,
      userId: id,
      userEmail: user.email,
      userFullName: user.fullName,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    const userRef = firestore.collection("users").doc(id);
    await userRef.collection("predictions").doc(predictId).set(prediction);

    return {
      status: "success",
      data: prediction,
    };
  } catch (error) {
    throw new InputError(`Error when predicting image: ${error.message}`);
  }
};

module.exports = { predict };
