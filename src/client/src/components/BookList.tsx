import { useState, useEffect } from 'react';
import { getBooks } from '../services/books';
import { Book } from '../types';

function BookList() {
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
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default BookList;
