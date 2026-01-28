import { useState, useEffect, use } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  // On charge toutes les questions
  const fetchAllQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const handleAnswer = (option) => {
    if (selectedAnswer) return; // Empêche de répondre plusieurs fois
    setSelectedAnswer(option);

    setUserAnswers([...userAnswers, option]);
    
    if (option === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true); // On affiche la fin du quiz
    }
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isCorrect = ( selectedAnswer === currentQuestion?.correctAnswer );

//  if (loading) return <div className="loader">Chargement du quiz...</div>;
//  if (!question) return <div>Aucune question trouvée. Lancez le script seed !</div>;
  if (totalQuestions === 0) return <div className="loader">Chargement du quiz...</div>;

  if (showResults === true) {
    return (
      <div className='quiz-result'>
        <h1>Votre score</h1>

        <h2>{score} / {totalQuestions}</h2>

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
              </div>
            );
          })}
        </div>
      </div>
    )
  }
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