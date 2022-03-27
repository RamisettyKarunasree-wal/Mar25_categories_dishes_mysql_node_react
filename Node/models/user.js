var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model('User', UserSchema);
