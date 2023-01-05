import supertest from "supertest";
import app from "../src/server";
import fs from "node:fs";
import { join } from "node:path";

import { Book, NewBook } from "../src/utils/types";

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

describe("Get book by id", () => {
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
    expect(createResponse.status).toEqual(201); // Assert that the book was created successfully

    // Retrieve the book by ID
    const bookId = createResponse.body.id;
    const getResponse = await request.get(`/api/books/${bookId}`).send();
    expect(getResponse.status).toEqual(200); // Assert that the book was retrieved successfully

    // Compare the book data
    expect(getResponse.body).toEqual(Object.assign(book, { id: bookId })); // Assert that the book data is correct
  });
});

describe("Update book", () => {
  const id = books[0].id;
  const book = {
    title: "Test book", // This is the only field that will be updated
  };
  it("should be succesfull request", async () => {
    await request
      .put(`/api/books/${id}`)
      .send(book)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should update book", async () => {
    const response = await request.put(`/api/books/${id}`).send(book);
    expect(response.body.title).toEqual(book.title);
  });
});

// error handling middleware
// delete test
// confirm delete, create, update
