const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  imageUrl: String,
  options: [String],
  correctAnswer: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  stats: {
        askedNb: { type: Number, default: 0 },
        correctNb: { type: Number, default: 0 },
        correctRate: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Question', questionSchema);