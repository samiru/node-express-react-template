import supertest from "supertest";
import app from "../src/server";
import fs from "node:fs";
import { join } from "node:path";

const request = supertest(app);

// Read data from JSON file (db.json contains the same data as db.ts)
const file = join(__dirname, "../src/database/db.json");
const { books } = JSON.parse(fs.readFileSync(file, "utf8"));

console.log({ books });

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
