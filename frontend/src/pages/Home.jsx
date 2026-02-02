import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchQuestionsByCategory } from '../api/quizApi';
import { shuffleArray } from '../utils';

export default function Home({ setQuestions, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories()
        .then((data) => setCategories(data))
        .catch((err) => console.error("Erreur catégories:", err));
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
            <h1>Choisir un thème</h1>
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                className="category-select"
            >
            <option value="Toutes">Toutes les catégories</option>

            {[...categories].sort((a,b) => a.nom.localeCompare(b.nom))
            .map(cat => (
                <option key={cat._id} value={cat.nom}>{cat.nom}</option>
            ))}
            </select>
            
            <p>Prêt pour un nouveau défi ?</p>
            
            <button onClick={startQuiz} className="start-btn">Lancer le Quiz</button>
        </div>
    )
}