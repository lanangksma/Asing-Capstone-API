const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

const postPrediction = async (model, image) => {
  try {
    const preProcessImage = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const classMapping = [
      { "Class Index": "0", "Class Name": "apel" },
      { "Class Index": "1", "Class Name": "ayam goreng" },
      { "Class Index": "2", "Class Name": "bakso" },
      { "Class Index": "3", "Class Name": "bayam" },
      { "Class Index": "4", "Class Name": "cabai" },
      { "Class Index": "5", "Class Name": "jeruk" },
      { "Class Index": "6", "Class Name": "kubis" },
      { "Class Index": "7", "Class Name": "mangga" },
      { "Class Index": "8", "Class Name": "nasi goreng" },
      { "Class Index": "9", "Class Name": "nasi uduk" },
      { "Class Index": "10", "Class Name": "pisang" },
      { "Class Index": "11", "Class Name": "rendang" },
      { "Class Index": "12", "Class Name": "risoles" },
      { "Class Index": "13", "Class Name": "salak" },
      { "Class Index": "14", "Class Name": "sate ayam" },
      { "Class Index": "15", "Class Name": "sawi" },
      { "Class Index": "16", "Class Name": "soto ayam" },
      { "Class Index": "17", "Class Name": "tahu" },
      { "Class Index": "18", "Class Name": "tempe goreng" },
      { "Class Index": "19", "Class Name": "wortel" },
    ];

    const prediction = model.predict(preProcessImage);
    const classScores = await prediction.data();
    const confidenceScore = Math.max(...classScores) * 100;

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const predictedLabel = classMapping[classResult]["Class Name"];

    return { confidenceScore, predictedLabel };
  } catch (error) {
    throw new InputError(`Error when preprocessing image: ${error.message}`);
  }
};

module.exports = postPrediction;
