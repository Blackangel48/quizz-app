const mongoose = require('mongoose')

// Sous-document car lié 1-à-1 à la question
const statsSchema = new mongoose.Schema({
  askedNb: { type: Number, default: 0 },
  correctNb: { type: Number, default: 0 },
  correctRate: { type: Number, default: 0 }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  urlImage: String,
  options: [String],
  correctAnswer: String,
  // Tableau de référence vers l'ID d'une catégorie
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // Intégration directe des stats
  stats: { type: statsSchema, default: () => ({}) }
});

module.exports = mongoose.model('Question', questionSchema);