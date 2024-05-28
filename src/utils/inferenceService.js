const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  // Decode and preprocess the image (sama seperti sebelumnya)
  const tensor = tf.node
    .decodeImage(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  // Predict the class probabilities
  const prediction = model.predict(tensor);

  // Mendapatkan array of scores (satu score untuk tiap kelas)
  const classScores = await prediction.data();

  // Mencari indeks kelas dengan score tertinggi (kelas terprediksi)
  const predictedClassIndex = classScores.indexOf(Math.max(...classScores));

  // Mendapatkan semua kemungkinan label dari model (asumsikan disimpan di model.labels)
  const labels = model.labels;

  // Mendapatkan label yang sesuai dengan indeks kelas terprediksi
  const predictedLabel = labels[predictedClassIndex];

  // Hitung confidence score untuk kelas terprediksi (sama seperti sebelumnya)
  const confidenceScore = classScores[predictedClassIndex] * 100;

  // Tidak perlu suggestion khusus karena bisa banyak kemungkinan

  // Kembalikan hasil prediksi
  return { confidenceScore, predictedLabel };
}
