import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchQuestionsByCategory } from '../api/quizApi';
import { shuffleArray } from '../hooks/utils';

export default function HomeTest({ setQuestions, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchCategories()
        .then((data) => {
            setCategories(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Erreur categories:", err)
            setLoading(false);
        });
    }, []);

    const startQuiz = async (categoryToUse) => {
        try {
            const theme = categoryToUse || selectedCategory;
            const data = await fetchQuestionsByCategory(theme);
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
    };

    const clickCategory = async (category) => {
            setSelectedCategory(category)
            await startQuiz(category);
    };

    return (
        <div className="setup-container">
            <h1>Quiz Master</h1>

            <div className='category-grid'>
                {loading ? (
                    // On affiche 12 boutons "fantômes" pendant le chargement
                    Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="skeleton skeleton-btn"></div>
                    ))
                ) : (
                    // On affiche les vraies données
                    categories.map((cat) => (
                        <button 
                            key={cat._id} 
                            onClick={() => {clickCategory(cat.nom)}} 
                            className='category-btn'
                        >
                            {cat.nom}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}