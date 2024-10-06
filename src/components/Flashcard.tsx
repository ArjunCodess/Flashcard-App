"use client"

import { useState } from 'react'

interface FlashcardProps {
  flashcard: { question: string; answer: string }
  onCorrectAnswer: () => void
  onWrongAnswer: () => void
  onNextCard: () => void
}

export default function Flashcard({ flashcard, onCorrectAnswer, onWrongAnswer, onNextCard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleCorrectAnswer = () => {
    if (!isAnswered) {
      onCorrectAnswer()
      setIsAnswered(true)
    }
  }

  const handleWrongAnswer = () => {
    if (!isAnswered) {
      onWrongAnswer()
      setIsAnswered(true)
    }
  }

  const handleNextCard = () => {
    setIsFlipped(false)
    setIsAnswered(false)
    onNextCard()
  }

  return (
    <div className="max-w-[40rem] mx-auto">
      <div 
        className="w-full h-[200px] bg-transparent cursor-pointer group perspective"
      >
        <div
          className={`cursor-relative preserve-3d w-full h-full duration-1000 ${isFlipped ? 'my-rotate-y-180' : ''}`}
        >
          {/* Front side (Question) */}
          <div className="absolute backface-hidden w-full h-full">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col justify-center p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Question:
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {flashcard.question}
              </p>
            </div>
          </div>

          {/* Back side (Answer) */}
          <div
            className="absolute my-rotate-y-180 backface-hidden w-full h-full"
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col justify-center p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Answer:
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {flashcard.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button
          onClick={handleFlip}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button
          onClick={handleCorrectAnswer}
          disabled={isAnswered}
          className={`flex-1 ${isAnswered ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          Correct
        </button>
        <button
          onClick={handleWrongAnswer}
          disabled={isAnswered}
          className={`flex-1 ${isAnswered ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
        >
          Wrong
        </button>
        <button
          onClick={handleNextCard}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  )
}