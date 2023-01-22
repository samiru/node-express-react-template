import { useState, useEffect } from "react";
import { getBooks } from "../../services/books";
import { Book } from "../../types";
import "./style.css";

interface BookListProps {
  books: Book[];
  selectBook: (book: Book) => void;
}

const BookList = (props: BookListProps) => {
  const { books, selectBook } = props;

  return (
    <>
      <div className="center">
        <ul style={{ listStyleType: "none" }}>
          {books.map((book) => (
            <li key={book.id} onClick={() => selectBook(book)}>
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
