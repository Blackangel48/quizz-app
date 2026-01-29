const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://db:27017/quizdb';

// --- Définition des Schémas ---
const Category = mongoose.model('Category', new mongoose.Schema({
    nom: { type: String, unique: true }
}));

const Question = mongoose.model('Question', new mongoose.Schema({
    text: String,
    imageUrl: String,
    options: [String],
    correctAnswer: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    stats: {
        askedNb: { type: Number, default: 0 },
        correctNb: { type: Number, default: 0 },
        correctRate: { type: Number, default: 0 }
    }
}));

// --- Définition des Données fixtures ---
const seedData = [
  {
    text: "Quel est ce monument célèbre ?",
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500",
    options: ["Tour Eiffel", "Empire State Building", "Burj Khalifa", "Tour de Pise"],
    correctAnswer: "Tour Eiffel",
    categoryNames: ["Monument"]
  },
  {
    text: "Quel langage est représenté par ce logo ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
    categoryNames: ["Informatique"]
  },
  {
    text: "Quel pokémon est représenté sur cette image ?",
    imageUrl: "https://www.pokepedia.fr/images/f/f9/Wailmer-RS.png",
    options: ["Oyacata", "Wailmer", "Laggron", "Wailord"],
    correctAnswer: "Wailmer",
    categoryNames: ["Pokemon"]
  },
  {
    text: "Quel pays est représenté sur cette carte ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Europe_location_SMO_alt.png",
    options: ["Italie", "Vatican", "Andorre", "Saint-Marin"],
    correctAnswer: "Saint-Marin",
    categoryNames: ["Geographie","Pays"]
  },
  {
    text: "Quel fruit est représenté sur cette image ?",
    imageUrl: "https://masalchi.fr/images/epice-bio/138/1613470378/big/combava-bio-epice-bio.jpg",
    options: ["Citron vert", "Combava", "Kaki", "Cédratier"],
    correctAnswer: "Combava",
    categoryNames: ["Fruits"]
  },
  {
    text: "Quel est la capitale du Danemark ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/960px-Flag_of_Denmark.svg.png",
    options: ["Helsinki", "Oslo", "Copenhague", "Stockholm"],
    correctAnswer: "Copenhague",
    categoryNames: ["Geographie","Capitale"]
  },
  {
    text: "Quel est cette personne ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
    options: ["Beethoven", "Mozart", "Vivaldi", "Chopin"],
    correctAnswer: "Beethoven",
    categoryNames: ["Histoire"]
  },
  {
    text: "Quel est cet instrument ?",
    imageUrl: "https://conservatoire.toulouse.fr/wp-content/uploads/sites/10/2023/11/Violoncelle.jpg",
    options: ["Violon", "Violoncelle", "Alto", "Contrebasse"],
    correctAnswer: "Violoncelle",
    categoryNames: ["Instrument"]
  },
  {
    text: "Qui a peint cette oeuvre ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    options: ["Delacroix", "Friedrich", "Runge", "Cole"],
    correctAnswer: "Friedrich",
    categoryNames: ["Art"]
  },
  {
    text: "Combien d'heure dorment les koalas par jour ?",
    imageUrl: "https://cdn.pixabay.com/photo/2011/09/28/23/19/koala-9960_960_720.jpg",
    options: ["Entre 14h et 16h", "Entre 16h et 18h", "Entre 18h et 20h", "Entre 20h et 22h"],
    correctAnswer: "Entre 18h et 20h",
    categoryNames: ["Animaux"]
  },
  {
    text: "Quelle est l'année de sortie de Minecraft ?",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjM4MzE0MGItY2U4OS00MTU5LTgwNWUtYzMxZjMzMTQ5Yjg1XkEyXkFqcGc@._V1_.jpg",
    options: ["2004", "2005", "2007", "2009"],
    correctAnswer: "2009",
    categoryNames: ["Informatique","Jeux-videos"]
  },
  {
    text: "Quel est le pays représenté par ce drapeau ?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
    options: ["Kosovo", "Kiribati", "Kirghizistan", "Koweït"],
    correctAnswer: "Kosovo",
    categoryNames: ["Geographie","Drapeaux"]
  }
];

// --- Fonction du Seeding ---
async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connecté à MongoDB pour le seeding...");
    
    await Category.deleteMany({}); // Nettoie la base Category
    await Question.deleteMany({}); // Nettoie la base Question

    // Utilisation de for...of pour gérer l'asynchrone (await) correctement
    for (const data of seedData) {
      const categoryIds = [];

      // Traitement des catégories une par une
      for (const catName of data.categoryNames) {
        // On cherche si la catégorie existe déjà
        let categoryDoc = await Category.findOne({ nom: catName });
                
        // Si elle n'existe pas, on la crée
        if (!categoryDoc) {
          categoryDoc = await Category.create({ nom: catName });
        }
        
        categoryIds.push(categoryDoc._id);
      }

      await Question.create({
        text: data.text,
        imageUrl: data.imageUrl,
        options: data.options,
        correctAnswer: data.correctAnswer,
        categories: categoryIds, // On passe le tableau d'IDs
        stats: { askedNb: 0, correctNb: 0, correctRate: 0 }
      });
    }
    
    console.log("Base de données peuplée avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors du seeding :", err);
    process.exit(1);
  }
}

seed();
