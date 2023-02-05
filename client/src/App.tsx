import { useEffect, useReducer } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

import ErrorMessage from "./components/ErrorMessage";

import { Book, BooksState } from "./types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import booksReducer from "./reducers/booksReducer";
import { useBookActions } from "./hooks/useBookActions";

function App() {
  const initialState: BooksState = {
    books: Array<Book>(),
    selectedBook: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(booksReducer, initialState);
  const { books, selectedBook: book, error } = state;

  const {
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    selectBook,
    deSelectBook,
  } = useBookActions(dispatch);

  useEffect(() => {
    if (error) {
      const { message, requestId } = error;
      toast.error(<ErrorMessage message={message} requestId={requestId} />);
    }
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBooks();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  return (
    <div className="App">
      <ToastContainer position="top-center" theme="colored" />
      <Container>
        <Row>
          <h1>Books</h1>
        </Row>
        <Row>
          <Col>
            <BookList
              selectedBook={book}
              books={books}
              selectBook={selectBook}
            />
          </Col>
          <Col>
            <BookForm
              addBook={addBook}
              updateBook={updateBook}
              deleteBook={deleteBook}
              deSelectBook={deSelectBook}
              book={book}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
