var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  inStore: { type: Boolean, required: true },
  upload_date: { type: Date, required: true },
  sizes: { type: [String], required: true },
});
module.exports = mongoose.model('Product', ProductSchema);
