import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Get all books", () => {
  it("should get all books", async () => {
    await request
      .get("/api/books")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
