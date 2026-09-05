const cropAdvice = {
  Healthy: {
    severity: "Low",
    action: "The leaf appears healthy. Continue regular monitoring and avoid overwatering."
  },
  "Early Blight": {
    severity: "Medium",
    action: "Remove visibly affected leaves, avoid wetting foliage, and seek local crop guidance."
  },
  "Late Blight": {
    severity: "High",
    action: "Isolate affected plants where possible and contact an agriculture expert quickly."
  },
  "Leaf Mold": {
    severity: "Medium",
    action: "Improve ventilation, reduce excess humidity, and remove affected leaves."
  },
  "Septoria Leaf Spot": {
    severity: "Medium",
    action: "Avoid overhead watering and remove infected leaves from the plant area."
  },
  "Spider Mites": {
    severity: "Medium",
    action: "Inspect the underside of leaves, isolate affected plants, and seek local pest-control guidance."
  }
};

window.cropAdvice = cropAdvice;