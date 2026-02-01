const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB (l'hôte est 'db' car défini dans docker-compose)
mongoose.connect('mongodb://db:27017/quizdb');

// Utilisation des routes
app.use('/api/questions', questionRoutes);
app.use('/api/categories', categoryRoutes);


app.listen(5000, () => console.log('Backend démarré sur le port 5000'));