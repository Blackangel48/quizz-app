const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/questionController');


// Route pour récupérer une question aléatoire
router.get('/api/questions/random', questionCtrl.getRandomQuestions);

// Route de récupération de la liste des questions
router.get('/api/questions', questionCtrl.getQuestions);

router.patch('/api/questions/stats-bulk', questionCtrl.updateStatsBulk);


// Route pour récupérer la question demandée
router.get('/api/questions/:id', questionCtrl.getQuestion);

router.patch('/api/questions/:id/stats', questionCtrl.updateStats);