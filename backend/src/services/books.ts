import connect from "../database";
import { Book } from "../utils/types";

const db = connect();

export default {
  async getAll() {
    return db.get("books").value();
  },
  async get(id: number) {
    return db.get("books").find({ id }).value();
  },
  async create(book: Book) {
    const books = db.get("books");
    book.id = books.size().value() + 1;
    books.push(book).write();

    return book;
  },
  async update(id: number, update: Partial<Book>) {
    db.get("books").find({ id }).assign(update).write();
    const updated = db.get("books").find({ id }).value();

    return updated;
  },
  async delete(id: number) {
    db.get("books").remove({ id });
  },
};
