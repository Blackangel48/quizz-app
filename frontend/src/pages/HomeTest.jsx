import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchQuestionsByCategory } from '../api/quizApi';
import { shuffleArray } from '../utils';

export default function Home2({ setQuestions, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories()
        .then((data) => setCategories(data))
        .catch((err) => console.error("Erreur categories:", err));
    }, []);

    const startQuiz = async () => {
        try {
            const data = await fetchQuestionsByCategory(selectedCategory);
            if (data.length > 0) {
                const randomized = shuffleArray(data).map(q => ({
                ...q,
                options: shuffleArray(q.options)
                }));

                setQuestions(randomized);
                navigate('/quiz');

            } else {
                alert("Aucune question pour ce thème.");
            }
        } catch (error) {
        console.error("Erreur start:", error);
        }
    }

    return (
        <div className="setup-container">
            <h1>Quiz Master</h1>

            {categories.map((cat) => (
                <button onClick={setSelectedCategory(cat.nom)}>{cat.nom}</button> // /!\ Selectionne la derniere categorie du map
            ))} 

            
            
            <button onClick={startQuiz} className="start-btn">Lancer le Quiz</button>
        </div>
    )
}