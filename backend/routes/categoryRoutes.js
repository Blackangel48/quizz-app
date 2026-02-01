const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryController');

// Route de récupération de la liste des categorie
router.get('/', categoryCtrl.getCategories);

module.exports = router;