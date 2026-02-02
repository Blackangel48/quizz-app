export default function QuizGame({ totalQuestions, currentIndex, currentQuestion, selectedAnswer, score, nextQuestion}) {
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
