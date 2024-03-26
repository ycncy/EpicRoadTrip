const mongoose = require('mongoose');

const barSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    ambiance: { type: String },
    openingHours: { type: String }
    // Ajouter d'autres champs selon les besoins de l'application
  });

  const Bar = mongoose.model('Bar', barSchema);
