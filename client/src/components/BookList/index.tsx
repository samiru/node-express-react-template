import { useEffect } from "react";
import { Book } from "../../types";
import "./style.css";

interface BookListProps {
  selectedBook?: Book;
  books: Book[];
  selectBook: (book: Book) => void;
}

const BookList = (props: BookListProps) => {
  const { books, selectedBook, selectBook } = props;

  return (
    <>
      <div className="center">
        <ul style={{ listStyleType: "none" }}>
          {books.map((book) => (
            <li
              key={book.id}
              onClick={() => selectBook(book)}
              className={
                selectedBook && book.id === selectedBook.id ? "selected" : ""
              }
            >
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
