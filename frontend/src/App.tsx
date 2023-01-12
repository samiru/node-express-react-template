import { useEffect, useState } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { getBooks } from './services/books';
import { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getBooks();
      if (data.length > 0) {
        setBooks(data);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <h1>Books</h1>
      <BookList books={books}/>
      <BookForm />
    </div>
  );
}

export default App;
