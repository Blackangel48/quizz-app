const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true }
});

const Category = mongoose.model('Category', categorySchema);
