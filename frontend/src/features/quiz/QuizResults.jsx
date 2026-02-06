import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizResults({ questions, userAnswers, score }) {
    const navigate = useNavigate();
      
    useEffect(() => {
    }, []);

    const onRestart = (() => {
      navigate('/');
    });

    // --- QUELQUES CONSTANTES
    const totalQuestions = questions.length;
  
    return (
      <div className='quiz-result'>
        <h1>Votre score</h1>

        <h2>{score} / {totalQuestions}</h2>

        <button onClick={onRestart} className="restart-btn">
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
                  <span>Taux de réussite global : {questionData.stats.askedNb === 0 ? "aucune-donnée" : (questionData.stats.correctRate * 100).toFixed(0) + "%"} ({questionData.stats.askedNb})</span>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={onRestart} className="restart-btn">
          Retour au menu
        </button>
      </div>
    )
};