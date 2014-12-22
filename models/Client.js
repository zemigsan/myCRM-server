var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  origin: String,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', ClientSchema);