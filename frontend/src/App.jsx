import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer une question aléatoire
  const fetchRandomQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    try {
      const response = await fetch('http://localhost:5000/api/questions/random');
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const handleAnswer = (option) => {
    if (selectedAnswer) return; // Empêche de répondre plusieurs fois
    setSelectedAnswer(option);
    setIsCorrect(option === question.correctAnswer);
  };

  if (loading) return <div className="loader">Chargement du quiz...</div>;
  if (!question) return <div>Aucune question trouvée. Lancez le script seed !</div>;

  return (
    <div className="quiz-container">
      <h1>Quiz Master</h1>

      <div className="question-card">
        {question.imageUrl && (
          <img src={question.imageUrl} alt="Question" className="question-image" />
        )}
        
        <h2>{question.text}</h2>

        <div className="options-grid">
          {question.options.map((option, index) => (
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
            <p>{isCorrect ? "✅ Excellent !" : `❌ Dommage ! La réponse était : ${question.correctAnswer}`}</p>
            <button onClick={fetchRandomQuestion} className="next-btn">Question Suivante</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;