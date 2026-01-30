const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB (l'hôte est 'db' car défini dans docker-compose)
mongoose.connect('mongodb://db:27017/quizdb');


// 1. Modèle Catégorie (Séparé car réutilisable)
const categorySchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true }
});
const Category = mongoose.model('Category', categorySchema);

// 2. Schéma Stats (Sous-document car lié 1-à-1 à la question)
const statsSchema = new mongoose.Schema({
  askedNb: { type: Number, default: 0 },
  correctNb: { type: Number, default: 0 },
  correctRate: { type: Number, default: 0 }
});

// 3. Modèle Question principal
const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  urlImage: String,
  options: [String],
  correctAnswer: String,
  // Tableau de référence vers l'ID d'une catégorie
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // Intégration directe des stats
  stats: { type: statsSchema, default: () => ({}) }
});

const Question = mongoose.model('Question', QuestionSchema);


// Route pour récupérer une question aléatoire
app.get('/api/questions/random', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});


// Route de récupération de la liste des questions
app.get('/api/questions', async (req, res) => {
  try {
    const { category } = req.query; // Récupère ?category=Nom depuis l'URL
    let query = {};

    if (category && category !== "Toutes") {
      // On cherche l'ID de la catégorie correspondant au nom
      const categoryDoc = await Category.findOne({ nom: category });
      if (categoryDoc) {
        // On cherche les questions qui contiennent cet ID dans leur tableau 'categories'
        query = { categories: categoryDoc._id };
      }
    }

    const questions = await Question.find(query).populate('categories');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur lors du filtrage" });
  }
});

// Route de récupération de la liste des categorie
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// Route pour récupérer la question demandée
app.get('/api/questions/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({error : "Question non trouvée"});
    }

    res.json(question);
  } catch (err) {
    // Si l'ID envoyé n'est pas au format MongoDB (CastError)
    res.status(400).json({ error: "ID invalide ou erreur serveur" });
  }
});


app.listen(5000, () => console.log('Backend démarré sur le port 5000'));