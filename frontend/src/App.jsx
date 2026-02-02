import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home'
import QuizGame from './features/quiz/QuizGame';
import QuizResults from './features/quiz/QuizResults';

import { fetchQuestionsByCategory, patchStats } from './api/quizApi.js';
// import './App.css';
import { shuffleArray } from './utils.js';

function App() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [quizStarted, setQuizStarted] = useState(false);

 
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);



  const startQuiz = async () => {
    const data = await fetchQuestionsByCategory(selectedCategory);
    if (data.lenght > 0) {
      setQuestions(shuffleArray(data).map((q) => ({...q, options: shuffleArray(q.options)})));
      navigate('/quiz');
    }
  }

  /*
  const restartGame = () => {
    setQuizStarted(false);
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true); // On affiche la fin du quiz
      sendFinalResults(questions, userAnswers);
    }
  };

  const handleFinish = (finalAnswers) => {
    setShowResults(true);
    const results = questions.map((q, i) => ({ id: q._id, isCorrect: finalAnswers[i] === q.correctAnswer }));
    patchStats(results);
  }

  if (showResults) return <QuizResults questions={questions} userAnswers={userAnswers} score={score} onRestart={restartGame} />;

  if (!quizStarted) return <Home onStartQuiz={startQuiz} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;

  return <QuizGame totalQuestions={questions.lenght} currentIndex={currentIndex} currentQuestion={questions[currentIndex]} selectedAnswer={selectedAnswer} score={score} nextQuestion={handleNextQuestion} />;
*/

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <Home onStart={startQuiz}/> } />
        <Route path='/quiz' element={ <QuizGame onFinish={() => navigate('/results')}/> } />
        <Route path='/results' element={ <QuizResults onRestart={() => navigate('/')}/> } />
      </Routes>
    </div>
  )

};


/*
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

// --- LOGIQUE DE RECUPERATION DES QUESTIONS DE LA CATEGORIE ET RANDOM ---
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

*/