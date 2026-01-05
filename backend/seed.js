const mongoose = require('mongoose');

// URL de connexion (on utilise 'db' car c'est le nom du service dans docker-compose)
const MONGO_URL = process.env.MONGO_URL || 'mongodb://db:27017/quizdb';

const QuestionSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  options: [String],
  correctAnswer: String
});

const Question = mongoose.model('Question', QuestionSchema);

const seedData = [
  {
    text: "Quel est ce monument célèbre ?",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500",
    options: ["Tour Eiffel", "Empire State Building", "Burj Khalifa", "Tour de Pise"],
    correctAnswer: "Tour Eiffel"
  },
  {
    text: "Quel langage est représenté par ce logo ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connecté à MongoDB pour le seeding...");
    
    await Question.deleteMany({}); // Nettoie la base existante
    await Question.insertMany(seedData);
    
    console.log("✅ Base de données peuplée avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur lors du seeding :", err);
    process.exit(1);
  }
}

seed();