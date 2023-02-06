import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Book } from "../../types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ErrorMessage } from "@hookform/error-message";

interface BookFormProps {
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  deSelectBook: () => void;
  book?: Book;
}

const BookForm = (props: BookFormProps) => {
  const { book, addBook, updateBook, deleteBook, deSelectBook } = props;

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Book>();

  // Populate the form with the book data
  useEffect(() => {
    reset({
      id: book?.id || "",
      author: book?.author || "",
      title: book?.title || "",
      description: book?.description || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const onSubmit: SubmitHandler<Book> = (data: Book) => {
    updateBook(data);
  };

  const onSubmitNew: SubmitHandler<Book> = (data: Book) => {
    addBook(data);
  };

  const handleDelete = () => {
    if (!book) return;
    deleteBook(book.id);
  };

  const clearForm = () => {
    deSelectBook();
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
                  {...register("title", { required: "Title is required" })}
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
          disabled={!book}
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
          disabled={!book}
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
