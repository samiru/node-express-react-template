import connect from "../../src/database";
import { v4 as uuidv4 } from "uuid";

import { Book, NewBook } from "../../src/utils/types";

const createBook = async (book?: NewBook): Promise<Book> => {
  if (!book) {
    book = {
      title: "Test book (Util)",
      author: "Test author (Util)",
      description: "Test description (Util)",
    };
  }
  const db = connect();
  const id = uuidv4();
  const newBook = Object.assign(book, { id });
  await db.get("books").push(newBook).write();
  return newBook;
};

const deleteBook = async (id: string): Promise<boolean> => {
  const db = connect();
  const deleted = db.get("books").remove({ id }).value();
  if (deleted.length === 0) {
    return false;
  }

  await db.write();

  return true;
};

export { createBook, deleteBook };
