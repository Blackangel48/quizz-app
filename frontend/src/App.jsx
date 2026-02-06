import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import HomeTest from './pages/HomeTest'
import QuizGame from './features/quiz/QuizGame';
import QuizResults from './features/quiz/QuizResults';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <div className='App'>
      <Routes>
        <Route path='/test' element={ 
          <Home 
            setQuestions={setQuestions} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
          /> }
        />
        <Route path='/quiz' element={ 
          <QuizGame 
            questions={questions} 
            score={score} 
            setScore={setScore}
            userAnswers={userAnswers} 
            setUserAnswers={setUserAnswers}
          /> }
        />
        <Route path='/results' element={ 
          <QuizResults 
            questions={questions} 
            userAnswers={userAnswers} 
            score={score}
          /> }
        />
        <Route path='/' element={ 
          <HomeTest 
            setQuestions={setQuestions} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
          /> }
        />
      </Routes>
    </div>
  );
};

export default App;