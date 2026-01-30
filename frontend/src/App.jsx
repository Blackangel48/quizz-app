import { useState, useEffect, use } from 'react';
import './App.css';
import { shuffleArray } from './utils.js';

function App() {
  const [questions, setQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  // On charge toutes les questions
  const fetchAllQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      let data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

    // On charge toutes les categories
  const fetchAllCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      let data = await response.json();
      setAllCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

// --- LOGIQUE D'ENVOI DE STATS ---
const sendFinalResults = async (questions, userAnswers) => {
  // On prépare un tableau d'objets contenant l'ID et si c'est correct
  const results = questions.map((q, index) => ({
    id: q._id,
    isCorrect: userAnswers[index] === q.correctAnswer
  }));

  try {
    const response = await fetch('http://localhost:5000/api/questions/stats-bulk', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ results })
    });

    if (response.ok) {
      console.log("Statistiques mises à jour avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des stats:", error);
  }
};

// --- LOGIQUE DE RECUPERATION DES QUESTIONS DE LA CATEGORIE ---
  const startQuiz = async () => {
    try {
      const url = `http://localhost:5000/api/questions?category=${selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const randomizedQuestions = shuffleArray(data).map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }));
        
        setQuestions(randomizedQuestions);
        setQuizStarted(true);
        setCurrentIndex(0);
        setScore(0);
        setUserAnswers([]);
        setShowResults(false)
      } else {
        alert("Aucune question trouvée pour ce thème.");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

// --- QUELQUES CONSTANTES
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isCorrect = ( selectedAnswer === currentQuestion?.correctAnswer );

// --- LOGIQUE DE REPONSE ---
  const handleAnswer = (option) => {
    if (selectedAnswer) return; // Empêche de répondre plusieurs fois
    setSelectedAnswer(option);

    setUserAnswers([...userAnswers, option]);
    
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true); // On affiche la fin du quiz
      sendFinalResults(questions, userAnswers);
    }
  };

//  if (loading) return <div className="loader">Chargement du quiz...</div>;
//  if (!question) return <div>Aucune question trouvée. Lancez le script seed !</div>;

// --- Écran de sélection (Accueil)
  if (!quizStarted) {
    return (
      <div className="setup-container">
        <h1>Choisir un thème</h1>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="category-select"
        >
          <option value="Toutes">Toutes les catégories</option>
          {[...allCategories].sort((a,b) => a.nom.localeCompare(b.nom))
          .map(cat => (
            <option key={cat._id} value={cat.nom}>{cat.nom}</option>
          ))}
        </select>
        
        <p>Prêt pour un nouveau défi ?</p>
        
        <button onClick={startQuiz} className="start-btn">Lancer le Quiz</button>
      </div>
    );
  }

// --- Ecran de chargement
  if (totalQuestions === 0) return <div className="loader">Chargement du quiz...</div>;

// --- Ecran de résultat
  if (showResults === true) {
    return (
      <div className='quiz-result'>
        <h1>Votre score</h1>

        <h2>{score} / {totalQuestions}</h2>

        <button 
          onClick={() => {
            setQuizStarted(false);
            setShowResults(false);
            setQuestions([]); // On vide pour forcer le rechargement au prochain start
          }} 
          className="restart-btn"
        >
          Retour au menu
        </button>

        <div className='quiz-recap'>
          {questions.map((questionData, index) => {
            const userChoice = userAnswers[index];
            const isUserCorrect = userChoice === questionData.correctAnswer;

            return (
              <div key={index} className={`question-recap ${isUserCorrect ? 'recap-correct' : 'recap-wrong'}`}>
                <div className="recap-header">

                  
  
                  <img src={questionData.imageUrl} alt="Question" className="recap-image" />
                  <p><strong>Question {index + 1}:</strong> {questionData.text}</p>
                </div>
              
                <div className='recap-details'>
                  <p className={isUserCorrect ? 'text-success' : 'text-danger'}>
                    Votre réponse : {userChoice}
                  </p>
                  {!isUserCorrect && (
                    <p className='text-actual'>
                      La bonne réponse était : <strong>{questionData.correctAnswer}</strong>
                    </p>
                  )}
                </div>
                <div key={index}>
                  <span>Taux de réussite global : {(questionData.stats.correctRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <button 
          onClick={() => {
            setQuizStarted(false);
            setShowResults(false);
            setQuestions([]); // On vide pour forcer le rechargement au prochain start
          }} 
          className="restart-btn"
        >
          Retour au menu
        </button>
      </div>
    )
  }
// --- Ecran de jeu
  else {
    return (
      <div className="quiz-container">
        <h1>Quiz Master</h1>

        <div className="question-card">

          <div className="progress-container">
            <div className="progress-text">
              {score} / {totalQuestions}
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {currentQuestion.imageUrl && (
            <a class="tile" href="#" tabIndex="0">
              <img src={currentQuestion.imageUrl} alt="Question" className="question-image" />
            </a>
          )}
          
          <h2>{currentQuestion.text}</h2>

          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`option-btn ${
                  selectedAnswer === option 
                    ? (isCorrect ? 'correct' : 'wrong') 
                    : ''
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div className="feedback">
              <p>{isCorrect ? "Excellent !" : `Dommage ! La réponse était : ${currentQuestion.correctAnswer}`}</p>
              <button onClick={nextQuestion} className="next-btn">Question Suivante</button>
            </div>
          )}
        </div>
      </div>
    )
  };
}

export default App;