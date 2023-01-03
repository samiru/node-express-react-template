//const server = require('../server');
//const supertest = require('supertest');

import supertest from "supertest";
import app from "../server";

const requestWithSupertest = supertest(app);

describe("Book Endpoints", () => {
  it("GET /api/books should show all books", async () => {
    const res = await requestWithSupertest.get("/api/books");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("books");
  });
});
