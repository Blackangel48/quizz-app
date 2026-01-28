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
  },
  {
    text: "Quel pokémon est représenté sur cette image ?",
    imageUrl: "https://www.pokepedia.fr/images/f/f9/Wailmer-RS.png",
    options: ["Oyacata", "Wailmer", "Laggron", "Wailord"],
    correctAnswer: "Wailmer"
  },
  {
    text: "Quel pays est représenté sur cette carte ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Europe_location_SMO_alt.png",
    options: ["Italie", "Vatican", "Andorre", "Saint-Marin"],
    correctAnswer: "Saint-Marin"
  },
  {
    text: "Quel fruit est représenté sur cette image ?",
    imageUrl: "https://masalchi.fr/images/epice-bio/138/1613470378/big/combava-bio-epice-bio.jpg",
    options: ["Citron vert", "Combava", "Kaki", "Cédratier"],
    correctAnswer: "Combava"
  },
  {
    text: "Quel est la capitale du Danemark ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/960px-Flag_of_Denmark.svg.png",
    options: ["Helsinki", "Oslo", "Copenhague", "Stockholm"],
    correctAnswer: "Copenhague"
  },
  {
    text: "Quel est cette personne ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
    options: ["Beethoven", "Mozart", "Vivaldi", "Chopin"],
    correctAnswer: "Beethoven"
  },
  {
    text: "Quel est cet instrument ?",
    imageUrl: "https://conservatoire.toulouse.fr/wp-content/uploads/sites/10/2023/11/Violoncelle.jpg",
    options: ["Violon", "Violoncelle", "Alto", "Contrebasse"],
    correctAnswer: "Violoncelle"
  },
  {
    text: "Qui a peint cette oeuvre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    options: ["Delacroix", "Friedrich", "Runge", "Cole"],
    correctAnswer: "Friedrich"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connecté à MongoDB pour le seeding...");
    
    await Question.deleteMany({}); // Nettoie la base existante
    await Question.insertMany(seedData);
    
    console.log("Base de données peuplée avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors du seeding :", err);
    process.exit(1);
  }
}

seed();