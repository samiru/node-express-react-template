import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Book } from "../../types";
import { addBook, updateBook, deleteBook } from "../../services/books";

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Toast from "react-bootstrap/esm/Toast";

import "./style.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ErrorMessage } from "@hookform/error-message";

interface BookFormProps {
  selectedBook?: Book;
  setSelectedBook: (book?: Book) => void;
}

const BookForm = (props: BookFormProps) => {
  const { selectedBook, setSelectedBook } = props;

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Book>();

  // Populate the form with the book data
  useEffect(() => {
    if (!selectedBook) return;
    reset({
      id: selectedBook.id,
      author: selectedBook.author,
      title: selectedBook.title,
      description: selectedBook.description,
    });
  }, [selectedBook, reset]);

  const onSubmit: SubmitHandler<Book> = (data: Book) => {
    updateBook(data);
    clearForm();
  };

  const onSubmitNew: SubmitHandler<Book> = (data: Book) => {
    addBook(data);
    clearForm();
  };

  const handleDelete = () => {
    if (!selectedBook) return;
    deleteBook(selectedBook.id);
    clearForm();
  };

  const clearForm = () => {
    reset({
      id: "",
      author: "",
      title: "",
      description: "",
    });

    setSelectedBook(undefined);
  };

  return (
    <>
      <Form>
        <input type="hidden" {...register("id")} />

        <Form.Group as={Row} className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="author">Author</Form.Label>
          </Col>
          <Col>
            <Controller
              name="author"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  {...register("author", { required: "Author is required" })}
                />
              )}
            />
            <ErrorMessage errors={errors} name="author" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col md={3}>
            <Form.Label htmlFor="title">Title</Form.Label>
          </Col>
          <Col>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  {...register("title", { required: "Book title is required" })}
                />
              )}
            />
            <ErrorMessage errors={errors} name="title" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col md={3}>
            <Form.Label as={Col} htmlFor="description">
              Description
            </Form.Label>
          </Col>
          <Col>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  {...field}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              )}
            />
            <ErrorMessage errors={errors} name="description" />
          </Col>
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          className="mx-1"
          disabled={!selectedBook}
        >
          Save
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmitNew)}
          className="text-nowrap mx-1"
        >
          Save New
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          className="mx-1"
          disabled={!selectedBook}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={clearForm} className="mx-1">
          Clear
        </Button>
      </div>
    </>
  );
};

export default BookForm;
