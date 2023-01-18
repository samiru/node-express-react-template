import connect from "../database";
import { Book } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const db = connect();

const getAll = async (): Promise<Book[]> => {
  return db.read().get("books").value();
};

const get = async (id: string): Promise<Book | undefined> => {
  return db.read().get("books").find({ id }).value();
};

const create = async (book: Book): Promise<Book> => {
  book.id = uuidv4();
  await db.get("books").push(book).write();

  return book;
};

const update = async (
  id: string,
  update: Partial<Book>
): Promise<Book | undefined> => {
  db.read();

  await db.get("books").find({ id }).assign(update).write();
  const updated = db.get("books").find({ id }).value();

  return updated;
};

const remove = async (id: string): Promise<boolean> => {
  db.read();

  const deleted = await db.get("books").remove({ id }).write();
  if (!deleted) {
    return false;
  }

  return true;
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
