"use client"

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FlashcardForm from './components/FlashcardForm'
import FlashcardListPage from './components/FlashcardListPage'
import TestingPage from './components/TestingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  folder: string;
}

export default function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
      setFlashcards(JSON.parse(storedFlashcards));
    }
  }, []);

  const addFlashcard = (newCard: Omit<Flashcard, 'id'>) => {
    const updatedFlashcards = [...flashcards, { ...newCard, id: Date.now().toString() }];
    setFlashcards(updatedFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const existingFolders = Array.from(new Set(flashcards.map(card => card.folder)));

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };

  const handleResetScore = () => {
    setScore(0);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ease-in-out">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-200 ease-in-out">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 md:p-8 transition-all duration-200 ease-in-out">
            <Routes>
              <Route path="/" element={<FlashcardForm onAddFlashcard={addFlashcard} existingFolders={existingFolders} />} />
              <Route path="/list" element={<FlashcardListPage flashcards={flashcards} />} />
              <Route path="/test" element={
                <TestingPage 
                  flashcards={flashcards} 
                  onCorrectAnswer={handleCorrectAnswer}
                  score={score}
                  onResetScore={handleResetScore}
                />
              } />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  )
}