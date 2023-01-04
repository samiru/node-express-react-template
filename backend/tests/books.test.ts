import supertest from "supertest";
import app from "../src/server";

const request = supertest(app);

describe("Get all books", () => {
  it("should get all books", async () => {
    await request
      .get("/api/books")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.length > 0;
      })
      .expect(200);
  });
});
