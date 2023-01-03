import db from "../database/db.js";
import { Book } from "../types";

export default {
  async getAll() {
    return db.data?.books || [];
  },
  async get(id: number) {
    //    return db.get("books").find({ id }).value();
    return db.data?.books.find((book: Book) => book.id === id);
  },
  async create(book: Book) {
    //    db.get("books").push(book).write();
    db.data?.books.push(book);
    db.write();
    return book;
  },
  async update(id: number, book: Book) {
    //    db.get("books").find({ id }).assign(book).write();
    //    db.data?.books.find((book) => book.id === id)?.assign(book);
    return book;
  },
  async delete(id: number) {
    //    db.get("books").remove({ id }).write();
  },
};
