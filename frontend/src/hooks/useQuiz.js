import { useState } from "react";

export const useQuiz = () => {
    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswer = (answer, correctAnswer) => {
        setUserAnswers(prev => [...prev, answer]);
        if (answer === correctAnswer) setScore(prev => prev + 1);
    };

    const resetQuiz = () => {
        setScore(0);
        setCurrentIndex(0);
        setUserAnswers([]);
    };

    return { score, currentIndex, setCurrentIndex, userAnswers, handleAnswer, resetQuiz };
}