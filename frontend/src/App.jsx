import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
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
        <Route path='/' element={ 
          <Home 
            setQuestions={setQuestions} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
          /> }
        />
        <Route path='/quiz' element={ 
          <QuizGame 
            onFinish={() => navigate('/results')}
          /> }
        />
        <Route path='/results' element={ 
          <QuizResults 
            onRestart={() => navigate('/')}
          /> }
        />
      </Routes>
    </div>
  );
};

export default App;