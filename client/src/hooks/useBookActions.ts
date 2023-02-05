import axios from "axios";
import * as service from "../services/books";
import { Book, BooksActionTypes } from "../types";

const useBookActions = (dispatch: Function) => {
  // serviceCaller is a higher order function that wraps the service calls
  // to the Books API and handles errors too
  const serviceCaller =
    (fn: Function) =>
    async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error) {
        let payload = { message: "Something went wrong" };

        // See https://axios-http.com/docs/handling_errors
        if (axios.isAxiosError(error)) {
          if (error.response) {
            payload = {
              ...error.response.data,
              requestId: error.response.headers["x-request-id"],
            };
          } else {
            payload = error;
          }
        }

        dispatch({
          type: BooksActionTypes.SET_ERROR,
          payload,
        });
      }
    };

  const addBook = async (book: Book): Promise<void> => {
    const added = await serviceCaller(service.addBook)(book);
    if (added) {
      dispatch({ type: "ADD_BOOK", payload: added });
    }
  };

  const updateBook = async (book: Book): Promise<void> => {
    const updated = await serviceCaller(service.updateBook)(book);
    if (updated) {
      dispatch({ type: "UPDATE_BOOK", payload: updated });
    }
  };

  const fetchBooks = async (): Promise<void> => {
    const books = await serviceCaller(service.getBooks)();
    if (books) {
      dispatch({ type: "SET_BOOKS", payload: books });
    }
  };

  const deleteBook = async (id: string): Promise<void> => {
    await serviceCaller(service.deleteBook)(id);
    dispatch({ type: "REMOVE_BOOK", payload: { id } });
  };

  const selectBook = (book: Book) => {
    dispatch({ type: BooksActionTypes.SELECT_BOOK, payload: book });
  };

  const deSelectBook = () => {
    dispatch({ type: BooksActionTypes.DESELECT_BOOK, payload: undefined });
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
