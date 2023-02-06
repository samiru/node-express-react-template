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
  each(["Author", "Title", "Description"]).it(
    "should render the label %s",
    (labelText) => {
      render(<BookForm {...mockMethods} />);
      expect(screen.getByText(labelText)).toBeInTheDocument();
    }
  );

  each([book.author, book.title, book.description]).it(
    "should render the form input with value %s",
    (inputValue) => {
      render(<BookForm {...mockMethods} book={book} />);
      expect(screen.getByDisplayValue(inputValue)).toBeInTheDocument();
    }
  );

  each(["Save", "Save New", "Delete", "Clear"]).it(
    "should render the button %s",
    (buttonText) => {
      render(<BookForm {...mockMethods} />);
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    }
  );

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

  each([
    {
      buttonText: "Save",
      method: mockUpdateBook,
    },
    {
      buttonText: "Save New",
      method: mockAddBook,
    },
    {
      buttonText: "Delete",
      method: mockDeleteBook,
    },
    {
      buttonText: "Clear",
      method: mockDeSelectBook,
    },
  ]).it(
    "should call the correct method when $buttonText is clicked",
    async (test) => {
      render(<BookForm {...mockMethods} book={book} />);
      const button = screen.getByText(test.buttonText);
      await act(async () => {
        button.click();
      });
      expect(test.method).toHaveBeenCalled();
    }
  );
});
