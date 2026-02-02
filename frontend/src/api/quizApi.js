const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCategories = () => 
  fetch(`${API_BASE_URL}/categories`).then(res => res.json());

export const fetchQuestionsByCategory = (category) => 
  fetch(`${API_BASE_URL}/questions?category=${category}`).then(res => res.json());

export const patchStats = (results) => 
  fetch(`${API_BASE_URL}/questions/stats-bulk`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results })
  });