const mongoose = require('mongoose');
const HobbySchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  date: { type: Date },
});
module.exports = mongoose.model('Hobby', HobbySchema);
