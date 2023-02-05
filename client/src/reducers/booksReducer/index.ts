import {
  Book,
  BooksAction,
  BooksActionTypes,
  BooksState,
  ErrorWithRequestId,
} from "../../types";

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
  switch (action.type) {
    case BooksActionTypes.SET_BOOKS:
      return {
        ...state,
        books: action.payload as Book[],
      };

    case BooksActionTypes.ADD_BOOK:
      const added = action.payload as Book;
      return {
        ...state,
        books: [...state.books, added],
        selectedBook: undefined,
      };

    case BooksActionTypes.UPDATE_BOOK:
      const updated = action.payload as Book;
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id === updated.id) {
            return updated;
          }
          return book;
        }),
        selectedBook: undefined,
      };

    case BooksActionTypes.REMOVE_BOOK:
      const deleted = action.payload as Book;
      return {
        ...state,
        books: state.books.filter((book) => book.id !== deleted.id),
        selectedBook: undefined,
      };

    case BooksActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload as Error | ErrorWithRequestId,
      };

    case BooksActionTypes.SELECT_BOOK:
      return {
        ...state,
        selectedBook: action.payload as Book,
      };

    case BooksActionTypes.DESELECT_BOOK:
      return {
        ...state,
        selectedBook: undefined,
      };

    default:
      return state;
  }
};

export default booksReducer;
