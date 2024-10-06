import { useMemo } from 'react';

interface FlashcardListPageProps {
  flashcards: { id: string; question: string; answer: string; folder: string }[];
}

const darkColors = [
  '#1E3A8A', // Dark Blue
  '#14532D', // Dark Green
  '#7E22CE', // Dark Purple
  '#831843', // Dark Pink
  '#7C2D12', // Dark Orange
  '#1F2937', // Dark Gray
  '#312E81', // Indigo
  '#3730A3', // Dark Indigo
  '#065F46', // Dark Teal
  '#701A75', // Dark Fuchsia
  '#581C87', // Dark Violet
  '#831843', // Dark Rose
];

function FlashcardListPage({ flashcards }: FlashcardListPageProps) {
  const groupedFlashcards = useMemo(() => {
    const groups: { [key: string]: typeof flashcards } = {};
    flashcards.forEach(card => {
      if (!groups[card.folder]) {
        groups[card.folder] = [];
      }
      groups[card.folder].push(card);
    });
    return groups;
  }, [flashcards]);

  const folderColors = useMemo(() => {
    const colors: { [key: string]: string } = {};
    Object.keys(groupedFlashcards).forEach(folder => {
      colors[folder] = darkColors[Math.floor(Math.random() * darkColors.length)];
    });
    return colors;
  }, [groupedFlashcards]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Flashcard List</h1>
        <p className="text-muted-foreground">
          Review all your created flashcards.
        </p>
      </div>
      {Object.keys(groupedFlashcards).length === 0 ? (
        <p className="text-center text-muted-foreground">No flashcards yet. Add some to get started!</p>
      ) : (
        Object.entries(groupedFlashcards).map(([folder, cards]) => (
          <div key={folder} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: folderColors[folder] }}>{folder}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((flashcard) => (
                <div key={flashcard.id} className="bg-card text-card-foreground rounded-lg shadow-sm border" style={{ borderColor: folderColors[folder] }}>
                  <div className="p-6 space-y-2">
                    <h3 className="font-semibold">Question: {flashcard.question}</h3>
                    <p className="text-sm text-muted-foreground">Answer: {flashcard.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FlashcardListPage;