const mongoose = require('mongoose');

const transportSchema = new Schema({
    type: { type: String, enum: ['bus', 'train', 'plane'], required: true },
    departureLocation: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true }
    // Ajouter d'autres champs selon les besoins de l'application
  });

  const Transport = mongoose.model('Transport', transportSchema);
