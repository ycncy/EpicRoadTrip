const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  price: Number
  // Ajouter d'autres champs selon les besoins de l'application
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
