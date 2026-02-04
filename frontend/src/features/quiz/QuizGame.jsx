import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchStats } from '../../api/quizApi';

export default function QuizGame({ questions, score, setScore, userAnswers, setUserAnswers}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
    }, []);

    // --- QUELQUES CONSTANTES
    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const isCorrect = ( selectedAnswer === currentQuestion?.correctAnswer );

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
        const results = questions.map((q, index) => ({
          id: q._id,
          isCorrect: userAnswers[index] === q.correctAnswer
        }));
        patchStats(results);
        navigate('/results');
      }
    };
  
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
