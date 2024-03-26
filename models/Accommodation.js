const mongoose = require('mongoose');

const accommodationSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['hotel', 'hostel', 'bnb', 'apartment'], required: true },
    pricePerNight: { type: Number, required: true },
    availability: [{ start: Date, end: Date }]
    // Ajouter d'autres champs selon les besoins de l'application
  });

  const Accommodation = mongoose.model('Accommodation', accommodationSchema);
