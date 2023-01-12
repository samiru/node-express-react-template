import { useEffect, useState } from 'react';
import './App.css';
import BookComponent from './components/BookComponent';
import BookListComponent from './components/BookListComponent';
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
      <BookListComponent books={books}/>
      <BookComponent />
    </div>
  );
}

export default App;
