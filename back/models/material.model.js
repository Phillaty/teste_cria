const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true},
  image: { type: String, required: false},
  active: { type: Boolean, required: true},
  dateInativated: {type: Date, required: false}
}, {
  timestamps: true,
});

const Materiais = mongoose.model('Materiais', materialSchema);

module.exports = Materiais;