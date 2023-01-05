import supertest from "supertest";
import app from "../src/server";
import fs from "node:fs";
import { join } from "node:path";

import { Book, NewBook } from "../src/utils/types";
import { createBook, deleteBook } from "./utils";

const request = supertest(app);

// Read data from JSON file
const file = join(__dirname, "../src/database/db.json");
const { books } = JSON.parse(fs.readFileSync(file, "utf8")) as {
  books: Book[];
};

describe("Get all books", () => {
  it("should be succesfull request", async () => {
    await request
      .get("/api/books")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should get all books", async () => {
    const response = await request.get("/api/books");
    expect(response.body.length).toEqual(books.length);
  });
});

describe("Get book", () => {
  const id = books[0].id;

  it("should be succesfull request", async () => {
    await request
      .get(`/api/books/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should get book by id", async () => {
    const response = await request.get(`/api/books/${id}`);
    expect(response.body.id).toEqual(id);
  });
});

describe("Create book", () => {
  const book: NewBook = {
    title: "Test book",
    author: "Test author",
    description: "Test description",
    notes: "Test notes",
  };
  it("should be succesfull request", async () => {
    await request
      .post("/api/books")
      .send(book)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });
  it("should create book", async () => {
    // Create the book
    const createResponse = await request.post("/api/books").send(book);
    expect(createResponse.status).toEqual(201);

    // Retrieve the book by ID
    const bookId = createResponse.body.id;
    const getResponse = await request.get(`/api/books/${bookId}`).send();
    expect(getResponse.status).toEqual(200);

    // Compare the book data
    expect(getResponse.body).toEqual(Object.assign(book, { id: bookId }));

    // Delete the book
    await deleteBook(bookId);
  });
});

describe("Update book", () => {
  let book: Book;

  beforeEach(async () => {
    book = await createBook();
  });

  afterEach(async () => {
    await deleteBook(book.id);
  });

  const update = {
    title: "Test book update", // This is the only field that will be updated
  };
  it("should be succesfull request", async () => {
    await request
      .put(`/api/books/${book.id}`)
      .send(update)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should update book", async () => {
    // Update the book
    const updateResponse = await request
      .put(`/api/books/${book.id}`)
      .send(update);
    expect(updateResponse.status).toEqual(200);

    // Retrieve the book by ID
    const getResponse = await request.get(`/api/books/${book.id}`).send();
    expect(getResponse.status).toEqual(200);

    // Compare the book data
    expect(getResponse.body).toEqual(Object.assign(book, update));
  });
});

describe("Delete book", () => {
  let id: string;

  beforeEach(async () => {
    const book = await createBook();
    id = book.id;
  });

  it("should be succesfull request", async () => {
    await request.delete(`/api/books/${id}`).expect(200);
  });
  it("should delete book", async () => {
    // Delete the book
    const deleteResponse = await request.delete(`/api/books/${id}`).send();
    expect(deleteResponse.status).toEqual(200);

    // Retrieve the book by ID
    const getResponse = await request.get(`/api/books/${id}`).send();
    expect(getResponse.status).toEqual(404);
  });
});

// TODO: Test error handling middleware
