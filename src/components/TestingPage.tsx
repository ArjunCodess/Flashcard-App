import { useState, useMemo } from 'react';
import FlashcardList from './FlashcardList';

interface Flashcard {
    id: string;
    question: string;
    answer: string;
    folder: string;
}

interface TestingPageProps {
  flashcards: Flashcard[];
  onCorrectAnswer: () => void;
  score: number;
  onResetScore: () => void;
}

function TestingPage({ flashcards, onCorrectAnswer, score, onResetScore }: TestingPageProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const folders = useMemo(() => {
    return Array.from(new Set(flashcards.map(card => card.folder)));
  }, [flashcards]);

  const filteredFlashcards = useMemo(() => {
    return selectedFolder
      ? flashcards.filter(card => card.folder === selectedFolder)
      : [];
  }, [flashcards, selectedFolder]);

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
  };

  const handleResetScore = () => {
    onResetScore();
    setSelectedFolder(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Test Yourself</h1>
        <p className="text-muted-foreground">
          Select a folder and review your flashcards.
        </p>
      </div>
      {!selectedFolder ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select a folder:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => handleFolderSelect(folder)}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
              >
                {folder}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className='py-4 sm:py-10 md:py-14'>
            <FlashcardList 
              flashcards={filteredFlashcards} 
              onCorrectAnswer={onCorrectAnswer}
              onWrongAnswer={() => {}}
            />
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Score: {score}</h2>
            <button 
              onClick={handleResetScore}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4"
            >
              Reset Score & Folder
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TestingPage;