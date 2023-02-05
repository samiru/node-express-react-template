import booksReducer from "../../reducers/booksReducer";
import { Book, BooksActionTypes } from "../../types";

describe("booksReducer", () => {
  it("should add the book", () => {
    const initialState = {
      books: [],
      book: undefined,
      error: undefined,
    };

    const book = {
      id: "1",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "A book about a hobbit",
    } as Book;

    const expectedState = {
      books: [book],
      book: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.ADD_BOOK,
        payload: book,
      })
    ).toEqual(expectedState);
  });
});
