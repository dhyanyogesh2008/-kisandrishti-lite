const photoInput = document.getElementById("leaf-photo");
const selectedFile = document.getElementById("selected-file");
const analyseButton = document.getElementById("analyse-button");
const resultCard = document.getElementById("result-card");
const diseaseName = document.getElementById("disease-name");
const confidenceText = document.getElementById("confidence-text");
const adviceText = document.getElementById("advice-text");
const leafPreview = document.getElementById("leaf-preview");
const modelStatus = document.getElementById("model-status");

const MODEL_URL = "./model/";

let model;
let uploadedImage;

loadModel();

async function loadModel() {
  try {
    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    modelStatus.textContent = "AI model ready. Upload a tomato leaf photo.";
  } catch (error) {
    modelStatus.textContent =
      "Model could not load. Check that model.json, metadata.json, and weights.bin are inside the model folder.";
  }
}

photoInput.addEventListener("change", () => {
  const photo = photoInput.files[0];

  if (!photo) {
    selectedFile.textContent = "No photo selected yet.";
    analyseButton.disabled = true;
    return;
  }

  const imageUrl = URL.createObjectURL(photo);

  uploadedImage = new Image();
  uploadedImage.src = imageUrl;

  leafPreview.src = imageUrl;
  leafPreview.classList.remove("hidden");

  selectedFile.textContent = `Selected photo: ${photo.name}`;
  analyseButton.disabled = false;
  analyseButton.textContent = "Analyse leaf";
});

analyseButton.addEventListener("click", async () => {
  resultCard.classList.remove("hidden");

  if (!model) {
    diseaseName.textContent = "AI model is still loading";
    confidenceText.textContent = "Please wait a few seconds and try again.";
    adviceText.textContent = "";
    return;
  }

  diseaseName.textContent = "Analysing leaf…";
  confidenceText.textContent = "";
  adviceText.textContent = "";
  analyseButton.disabled = true;

  const predictions = await model.predict(uploadedImage);

  predictions.sort((a, b) => b.probability - a.probability);

  const bestResult = predictions[0];
  const confidence = Math.round(bestResult.probability * 100);
  const advice = window.cropAdvice[bestResult.className];

  diseaseName.textContent = bestResult.className;
  confidenceText.textContent = `AI confidence: ${confidence}%`;

  if (confidence < 65) {
    adviceText.textContent =
      "Image confidence is low. Please take a clear, close, well-lit photo of one tomato leaf.";
  } else {
    adviceText.textContent =
      `Severity: ${advice.severity}. First action: ${advice.action}`;
  }

  analyseButton.disabled = false;
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
});