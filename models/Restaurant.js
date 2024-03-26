const mongoose = require('mongoose');

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    cuisineType: { type: String, required: true },
    averagePrice: { type: Number }
    // Ajouter d'autres champs selon les besoins de l'application
  });

  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
