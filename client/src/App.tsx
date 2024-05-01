import React, { useState } from 'react';
import './App.css';
import { BookList } from './Book/BookList/BookList';
import { Header } from './Header';
import { BookPage } from './Book/BookPage/BookPage';
import { BookCreate } from './Book/BookPage/BookCreate';

const App = () => {
  const [bookId, setBookId] = useState<number>();
  const [isCreating, setIsCreating] = useState(false);

  const handleBack = () => {
    setBookId(0);
    setIsCreating(false);
  };

  const handleCreated = (id: number) => {
    setBookId(id);
    setIsCreating(false);
  }

  return (
    <div className="App">
      <Header
        bookSelected={!!bookId}
        onBack={handleBack}
        onCreate={() => {setIsCreating(true)}}
      />
      {!isCreating && !bookId && <BookList onSelect={(id) => setBookId(id)}/>}
      {!!bookId && <BookPage bookId={bookId} onClose={handleBack}/>}
      {isCreating && <BookCreate onSelect={handleCreated} onCancel={handleBack}/>}
    </div>
  );
}

export default App;
