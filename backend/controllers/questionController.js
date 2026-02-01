const Question = require('../models/Question');
const Category = require('../models/Category');

exports.getRandomQuestions = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};


exports.getQuestions = async (req, res) => {
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
};

exports.getQuestion = async (req, res) => {
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
};


// --- STATS ---

exports.updateStatsBulk = async (req, res) => {
  try {
    const { results } = req.body; // [{id: "...", isCorrect: true}, ...]

    const updatePromises = results.map(async (item) => {
      const question = await Question.findById(item.id);
      if (question) {
        question.stats.askedNb += 1;
        if (item.isCorrect) {
          question.stats.correctNb += 1;
        }
        // Recalcul du taux
        question.stats.correctRate = question.stats.correctNb / question.stats.askedNb;
        return question.save();
      }
    });

    await Promise.all(updatePromises);
    res.json({ message: "Toutes les stats sont à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour globale" });
  }
};

exports.updateStats = async (req, res) => {
  const { isCorrect } = req.body;
  
  const update = {
    $inc: { 
      "stats.askedNb": 1,
      "stats.correctNb": isCorrect ? 1 : 0 
    }
  };

  const question = await Question.findByIdAndUpdate(req.params.id, update, { new: true });
  
  // Recalcul du taux de réussite
  question.stats.correctRate = question.stats.correctNb / question.stats.askedNb;
  await question.save();

  res.json(question);
};