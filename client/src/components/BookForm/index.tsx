import { useEffect, useState } from "react";
import { Book } from "../../types";
import { addBook, updateBook, deleteBook } from "../../services/books";
import "./style.css";

interface BookFormProps {
  book: Book;
  setBook: (book: Book) => void;
}

//const didUpdate = () => {
//  console.log("BookForm did update");
//};

const BookForm = (props: BookFormProps) => {
  //const [book, setBook] = useState<Book>();
  const { book, setBook } = props;

  //  useEffect(didUpdate);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ event, book });
    console.log("submit");
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log({ event, book });
    console.log("save");
  };

  const handleSaveNew = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log({ event, book });
    console.log("save new");
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log({ event, book });
    console.log("delete");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`name: ${name}, value: ${value}`);
    setBook({ ...book, [name]: value });
  };

  return (
    <>
      <div className="center">
        <h1>Book</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Author
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={book.description}
              onChange={handleChange}
            />
          </label>
          <div>
            <button type="submit">Save New</button>
            <button type="submit">Save</button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookForm;
