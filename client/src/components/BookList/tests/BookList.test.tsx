import "@testing-library/jest-dom";

import { act, render, screen } from "@testing-library/react";
import each from "jest-each";
import BookList from "../";

const mockBooks = [
  {
    id: "1",
    author: "J.R.R. Tolkien",
    title: "The Hobbit",
    description: "A book about a hobbit",
  },
  {
    id: "2",
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings",
    description: "A book about a ring",
  },
];

const mockSelectBook = jest.fn();

describe("BookList", () => {
  each(mockBooks).it("should render the book %s", (book) => {
    render(<BookList selectBook={mockSelectBook} books={mockBooks} />);
    expect(screen.getByText(book.title)).toBeInTheDocument();
  });

  it("should call selectBook when a book is clicked", () => {
    render(<BookList selectBook={mockSelectBook} books={mockBooks} />);
    act(() => {
      screen.getByText(mockBooks[0].title).click();
    });
    expect(mockSelectBook).toHaveBeenCalledWith(mockBooks[0]);
  });
});
