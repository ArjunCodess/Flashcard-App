import { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

interface FlashcardListProps {
  flashcards: { question: string; answer: string }[];
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

function FlashcardList({ flashcards, onCorrectAnswer, onWrongAnswer }: FlashcardListProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCurrentCardIndex(0);
    setReviewedCards(new Set());
  }, [flashcards]);

  const handleNextCard = () => {
    if (reviewedCards.size === flashcards.length) {
      alert("No flashcards left to review!");
      return;
    }

    let nextIndex = (currentCardIndex + 1) % flashcards.length;
    while (reviewedCards.has(nextIndex) && reviewedCards.size < flashcards.length) {
      nextIndex = (nextIndex + 1) % flashcards.length;
    }
    setCurrentCardIndex(nextIndex);
  };

  const handleReviewCard = (isCorrect: boolean) => {
    setReviewedCards(prev => new Set(prev).add(currentCardIndex));
    if (isCorrect) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  };

  if (flashcards.length === 0) {
    return <p className="text-center text-gray-600">No flashcards yet. Add some to get started!</p>;
  }

  return (
    <div className="flashcard-list">
      <Flashcard
        flashcard={flashcards[currentCardIndex]}
        onCorrectAnswer={() => handleReviewCard(true)}
        onWrongAnswer={() => handleReviewCard(false)}
        onNextCard={handleNextCard}
      />
      <p className="mt-4 text-center text-gray-600">
        Card {currentCardIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
}

export default FlashcardList;