import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BookList } from './Book/BookList/BookList';
import { BookCreate } from './Book/BookPage/BookCreate';
import { BookPage } from './Book/BookPage/BookPage';
import { LookupPage } from './Lookup/LookupPage';

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
  };

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/create" element={<BookCreate />} />
          <Route path="/search" element={<LookupPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
