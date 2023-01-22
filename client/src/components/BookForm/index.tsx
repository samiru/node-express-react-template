import { useEffect, useState } from "react";
import {
  useForm,
  Resolver,
  SubmitHandler,
  useController,
} from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  const onSubmit: SubmitHandler<Book> = (data: Book) => console.log(data);

  /*
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setBook({ ...book, [name]: value });
  };
*/

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="author">Author</label>
      <input
        type="text"
        placeholder="Author"
        value={book.author}
        {...register("author", { required: true })}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        placeholder="Title"
        value={book.title}
        {...register("title", { required: true })}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        placeholder="Description"
        value={book.description}
        {...register("description", { required: true })}
      />

      <input type="submit" />
    </form>
  );
};

export default BookForm;
