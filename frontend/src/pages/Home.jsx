import { useState, useEffect, use } from 'react';
import { fetchCategories } from '../api/quizApi';

export default function Home({ onStartQuiz, selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <div className="setup-container">
            <h1>Choisir un thème</h1>
            <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="category-select"
            >
            <option value="Toutes">Toutes les catégories</option>

            {[...allCategories].sort((a,b) => a.nom.localeCompare(b.nom))
            .map(cat => (
                <option key={cat._id} value={cat.nom}>{cat.nom}</option>
            ))}
            </select>
            
            <p>Prêt pour un nouveau défi ?</p>
            
            <button onClick={onStartQuiz} className="start-btn">Lancer le Quiz</button>
        </div>
    )
}