import connect from "../database";
import { Book } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const db = connect();

export default {
  async getAll() {
    return db.get("books").value();
  },
  async get(id: string) {
    return db.get("books").find({ id }).value();
  },
  async create(book: Book) {
    book.id = uuidv4();
    db.get("books").push(book).write();

    return book;
  },
  async update(id: string, update: Partial<Book>) {
    db.get("books").find({ id }).assign(update).write();
    const updated = db.get("books").find({ id }).value();

    return updated;
  },
  async delete(id: string) {
    const deleted = db.get("books").remove({ id }).value();
    if (deleted.length === 0) {
      return false;
    }

    db.write();

    return true;
  },
};
