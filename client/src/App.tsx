import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { getBooks } from "./services/books";
import { Book } from "./types";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const selectBook = (book: Book) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        if (data.length > 0) {
          setBooks(data);
        }
      } catch (error) {
        const { message } = error as Error;
        if (message) {
          toast.error(message);
        }
        console.log(error);
      }
    }

    fetchData();
  }, [selectedBook]);

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
              selectedBook={selectedBook}
              books={books}
              selectBook={selectBook}
            />
          </Col>
          <Col>
            <BookForm
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
