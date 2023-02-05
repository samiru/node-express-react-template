import booksReducer from "../../reducers/booksReducer";
import { Book, BooksActionTypes } from "../../types";

describe("booksReducer", () => {
  it("should add the book", () => {
    const initialState = {
      books: [],
      selectedBook: undefined,
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
      selectedBook: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.ADD_BOOK,
        payload: book,
      })
    ).toEqual(expectedState);
  });

  it("should update the book", () => {
    const book = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit",
    } as Book;

    const initialState = {
      books: [book],
      selectedBook: undefined,
      error: undefined,
    };

    const updatedBook = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit (updated)",
    } as Book;

    const expectedState = {
      books: [updatedBook],
      selectedBook: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.UPDATE_BOOK,
        payload: updatedBook,
      })
    ).toEqual(expectedState);
  });

  it("should remove the book", () => {
    const book = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit",
    } as Book;

    const initialState = {
      books: [book],
      selectedBook: undefined,
      error: undefined,
    };

    const expectedState = {
      books: [],
      selectedBook: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.REMOVE_BOOK,
        payload: book,
      })
    ).toEqual(expectedState);
  });

  it("should select the book", () => {
    const book = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit",
    } as Book;

    const initialState = {
      books: [book],
      selectedBook: undefined,
      error: undefined,
    };

    const expectedState = {
      books: [book],
      selectedBook: book,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.SELECT_BOOK,
        payload: book,
      })
    ).toEqual(expectedState);
  });

  it("should deselect the book", () => {
    const book = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit",
    } as Book;

    const initialState = {
      books: [book],
      selectedBook: book,
      error: undefined,
    };

    const expectedState = {
      books: [book],
      selectedBook: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.DESELECT_BOOK,
        payload: undefined,
      })
    ).toEqual(expectedState);
  });

  it("should set the error", () => {
    const error = new Error("Something went wrong");

    const initialState = {
      books: [],
      selectedBook: undefined,
      error: undefined,
    };

    const expectedState = {
      books: [],
      selectedBook: undefined,
      error: error,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.SET_ERROR,
        payload: error,
      })
    ).toEqual(expectedState);
  });

  it("should set the books", () => {
    const book = {
      id: "1",
      title: "The Hobbit",
      description: "A book about a hobbit",
    } as Book;

    const initialState = {
      books: [],
      selectedBook: undefined,
      error: undefined,
    };

    const expectedState = {
      books: [book],
      selectedBook: undefined,
      error: undefined,
    };

    expect(
      booksReducer(initialState, {
        type: BooksActionTypes.SET_BOOKS,
        payload: [book],
      })
    ).toEqual(expectedState);
  });
});
