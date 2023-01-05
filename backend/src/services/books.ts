import connect from "../database";
import { Book } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const db = connect();

export default {
  async getAll() {
    return db.read().get("books").value();
  },
  async get(id: string) {
    return db.read().get("books").find({ id }).value();
  },
  async create(book: Book) {
    book.id = uuidv4();
    await db.get("books").push(book).write();

    return book;
  },
  async update(id: string, update: Partial<Book>) {
    db.read();

    await db.get("books").find({ id }).assign(update).write();
    const updated = db.get("books").find({ id }).value();

    return updated;
  },
  async delete(id: string) {
    db.read();

    const deleted = await db.get("books").remove({ id }).write();
    if (!deleted) {
      return false;
    }

    return true;
  },
};
