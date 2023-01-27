export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  notes?: string;
}

export interface BooksState {
  books: Book[];
  book?: Book;
  error?: ErrorWithRequestId;
}

export enum BooksActionTypes {
  DESELECT_BOOK = "DESELECT_BOOK",
  SELECT_BOOK = "SELECT_BOOK",
  SET_BOOKS = "SET_BOOKS",
  ADD_BOOK = "ADD_BOOK",
  UPDATE_BOOK = "UPDATE_BOOK",
  REMOVE_BOOK = "REMOVE_BOOK",
  SET_ERROR = "SET_ERROR",
}

export interface ErrorWithRequestId extends Error {
  requestId?: string;
}

export interface BooksAction {
  type: BooksActionTypes;
  payload: Book | Book[] | Error | ErrorWithRequestId | undefined;
}
