import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Book } from "../../types";
import { addBook, updateBook, deleteBook } from "../../services/books";
import "./style.css";

interface BookFormProps {
  book: Book;
  setBook: (book: Book) => void;
}

const BookForm = (props: BookFormProps) => {
  const { book } = props;

  console.log("BookForm: ", book);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  // Populate the form with the book data
  useEffect(() => {
    reset({
      id: book.id,
      author: book.author,
      title: book.title,
      description: book.description,
    });
  }, [book, reset]);

  const onSubmit: SubmitHandler<Book> = (data: Book) => {
    updateBook(data);
  };

  const onSubmitNew: SubmitHandler<Book> = (data: Book) => {
    addBook(data);
  };

  const handleDelete = () => {
    deleteBook(book.id);
  };

  console.log(errors);

  return (
    <form>
      <input type="hidden" {...register("id")} />

      <label htmlFor="author">Author</label>
      <input
        type="text"
        placeholder="Author"
        {...register("author", { required: true })}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        placeholder="Description"
        {...register("description", { required: true })}
      />

      <input type="submit" value="Submit" onClick={handleSubmit(onSubmit)} />
      <input
        type="submit"
        value="Submit New"
        onClick={handleSubmit(onSubmitNew)}
      />
      <input type="button" value="Delete" onClick={handleDelete} />
    </form>
  );
};

export default BookForm;
