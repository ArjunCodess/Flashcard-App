"use client"

import { useState, useEffect } from 'react'

interface FlashcardFormProps {
  onAddFlashcard: (card: { question: string; answer: string; folder: string }) => void;
  existingFolders: string[];
}

export default function FlashcardForm({ onAddFlashcard, existingFolders }: FlashcardFormProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [folder, setFolder] = useState('')
  const [newFolder, setNewFolder] = useState('')
  const [isNewFolder, setIsNewFolder] = useState(existingFolders.length === 0)

  useEffect(() => {
    if (existingFolders.length > 0 && !isNewFolder) {
      setFolder(existingFolders[0])
    }
  }, [existingFolders])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedFolder = isNewFolder ? newFolder : folder
    if (question.trim() && answer.trim() && selectedFolder.trim()) {
      onAddFlashcard({ question: question.trim(), answer: answer.trim(), folder: selectedFolder.trim() })
      setQuestion('')
      setAnswer('')
      setNewFolder('')
      setIsNewFolder(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Flashcard</h1>
        <p className="text-muted-foreground">
          Add a new flashcard to your collection.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="folder" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Folder
          </label>
          {existingFolders.length === 0 ? (
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              className="flex-grow h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          ) : (
            <div className="flex space-x-2">
              <select
                id="folder"
                value={isNewFolder ? 'new' : folder}
                onChange={(e) => {
                  if (e.target.value === 'new') {
                    setIsNewFolder(true)
                  } else {
                    setIsNewFolder(false)
                    setFolder(e.target.value)
                  }
                }}
                className="flex-grow h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {existingFolders.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
                <option value="new">Create new folder</option>
              </select>
              {isNewFolder && (
                <input
                  type="text"
                  placeholder="New folder name"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  className="flex-grow h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="question" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Question
          </label>
          <input
            id="question"
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="answer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Answer
          </label>
          <input
            id="answer"
            type="text"
            placeholder="Enter the answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <button 
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  )
}