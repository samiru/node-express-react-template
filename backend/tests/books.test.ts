import supertest from "supertest";
import app from "../src/server";
import fs from "node:fs";
import { join } from "node:path";

import { Book } from "../src/utils/types";

const request = supertest(app);

// Read data from JSON file (db.json contains the same data as db.ts)
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
  const book = {
    title: "Test book",
    author: "Test author",
    description: "Test description",
    notes: "Test notes",
  };
  it("should be succesfull request", async () => {
    const response = await request.post("/api/books").send(book);
    //      .set("Accept", "application/json");
    //      .expect("Content-Type", /json/)
    //      .expect(200);
    expect(response.status).toEqual(201);
  });
  it("should create book", async () => {
    const response = await request.post("/api/books").send(book);
    expect(response.body.title).toEqual(book.title);
  });
});
