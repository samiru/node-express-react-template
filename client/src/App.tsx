import { useEffect, useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { getBooks } from "./services/books";
import { Book } from "./types";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    description: "",
  });

  const selectBook = (book: Book) => {
    setBook(book);
  };

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
      <Container>
        <Row>
          <h1>Books</h1>
        </Row>
        <Row>
          <Col>
            <BookList books={books} selectBook={selectBook} />
          </Col>
          <Col>
            <BookForm book={book} setBook={setBook} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
