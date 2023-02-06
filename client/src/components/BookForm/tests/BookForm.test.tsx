import "@testing-library/jest-dom";

import { act, render, screen } from "@testing-library/react";
import each from "jest-each";
import BookForm from "../";

const mockAddBook = jest.fn();
const mockUpdateBook = jest.fn();
const mockDeleteBook = jest.fn();
const mockDeSelectBook = jest.fn();

const mockMethods = {
  addBook: mockAddBook,
  updateBook: mockUpdateBook,
  deleteBook: mockDeleteBook,
  deSelectBook: mockDeSelectBook,
};

const book = {
  id: "1",
  author: "J.R.R. Tolkien",
  title: "The Hobbit",
  description: "A book about a hobbit",
};

describe("BookForm", () => {
  it("should render the form", () => {
    render(<BookForm {...mockMethods} />);

    expect(screen.getByText("Author")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("should render the form with book data", () => {
    render(<BookForm book={book} {...mockMethods} />);

    expect(screen.getByDisplayValue(book.author)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.description)).toBeInTheDocument();
  });

  it("should render the buttons", () => {
    render(<BookForm {...mockMethods} />);

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Save New")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  each([
    {
      field: "author",
      message: "Author is required",
    },
    {
      field: "title",
      message: "Title is required",
    },
    {
      field: "description",
      message: "Description is required",
    },
  ]).it(
    "should show error message on save when required form field is empty",
    async (test) => {
      const bookWithOutField = { ...book, [test.field]: "" };
      render(<BookForm {...mockMethods} book={bookWithOutField} />);
      const saveButton = screen.getByText("Save");
      await act(async () => {
        saveButton.click();
      });
      expect(screen.getByText(test.message)).toBeInTheDocument();
    }
  );

  it("should call addBook when Save New is clicked", async () => {
    render(<BookForm {...mockMethods} book={book} />);
    const saveNewButton = screen.getByText("Save New");
    await act(async () => {
      saveNewButton.click();
    });
    expect(mockAddBook).toHaveBeenCalled();
  });

  it("should call updateBook when Save is clicked", async () => {
    render(<BookForm {...mockMethods} book={book} />);
    const saveButton = screen.getByText("Save");
    await act(async () => {
      saveButton.click();
    });
    expect(mockUpdateBook).toHaveBeenCalled();
  });

  it("should call deleteBook when Delete is clicked", async () => {
    render(<BookForm {...mockMethods} book={book} />);
    const deleteButton = screen.getByText("Delete");
    await act(async () => {
      deleteButton.click();
    });
    expect(mockDeleteBook).toHaveBeenCalled();
  });

  it("should call deSelectBook when Clear is clicked", async () => {
    render(<BookForm {...mockMethods} book={book} />);
    const clearButton = screen.getByText("Clear");
    await act(async () => {
      clearButton.click();
    });
    expect(mockDeSelectBook).toHaveBeenCalled();
  });
});
