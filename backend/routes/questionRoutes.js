const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/questionController');


// Route pour récupérer une question aléatoire
router.get('/random', questionCtrl.getRandomQuestions);

// Route de récupération de la liste des questions
router.get('/', questionCtrl.getQuestions);

router.patch('/stats-bulk', questionCtrl.updateStatsBulk);


// Route pour récupérer la question demandée
router.get('/:id', questionCtrl.getQuestion);

router.patch('/:id/stats', questionCtrl.updateStats);

module.exports = router;