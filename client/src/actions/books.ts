import * as service from "../services/books";
import { Book, BooksActionTypes } from "../types";

const useBookActions = (dispatch: Function) => {
  const serviceCaller =
    (fn: Function) =>
    async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error(error);
        const { message } = error as Error;
        if (message) {
          dispatch({
            type: BooksActionTypes.SET_ERROR,
            payload: error,
          });
        } else {
          dispatch({
            type: BooksActionTypes.SET_ERROR,
            payload: "Something went wrong",
          });
        }
      }
    };

  const addBook = async (book: Book): Promise<Book> => {
    const added = await serviceCaller(service.addBook)(book);
    if (added) {
      dispatch({ type: "ADD_BOOK", payload: added });
    }

    return added;
  };

  const updateBook = async (book: Book): Promise<Book> => {
    const updated = await serviceCaller(service.updateBook)(book);
    if (updated) {
      dispatch({ type: "UPDATE_BOOK", payload: updated });
    }

    return updated;
  };

  const fetchBooks = async (): Promise<Book[]> => {
    const books = await serviceCaller(service.getBooks)();
    if (books) {
      dispatch({ type: "SET_BOOKS", payload: books });
    }

    return books;
  };

  const deleteBook = async (id: string): Promise<void> => {
    await serviceCaller(service.deleteBook)(id);
    dispatch({ type: "REMOVE_BOOK", payload: { id } });
  };

  const selectBook = (book: Book) => {
    dispatch({ type: BooksActionTypes.SELECT_BOOK, payload: book });
  };

  const deSelectBook = () => {
    dispatch({ type: BooksActionTypes.SELECT_BOOK, payload: undefined });
  };

  return {
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    selectBook,
    deSelectBook,
  };
};

export { useBookActions };
