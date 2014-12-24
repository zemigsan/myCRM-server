var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  datestarted: { type: Date, default: Date.now },
  datefinished: Date,
  value: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', index: true },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);