import { useState, useEffect } from 'react';
import { getBooks } from '../services/books';
import { Book } from '../types';
import "./style.css";

interface BookListProps {
  books: Book[];
}

function BookList(props: BookListProps) {
  return (
    <>
      <div className="center">
        <ul style={{ listStyleType: "none" }}>
          {props.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
