import { Book } from "../../types";
import "./style.css";

interface BookListProps {
  book: Book;
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
            <li
              key={book.id}
              onClick={() => selectBook(book)}
              className={book.id === props.book.id ? "selected" : ""}
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
