import express from "express";
import books from "../services/books";

// Create router
const router = express.Router();

// GET /api/books - List books
router.get("/", async (req, res) => {
  res.send(await books.getAll());
});

// GET /api/books/:id - Get book
router.get("/:id", async (req, res) => {
  const book = await books.get(req.params.id);
  if (!book) {
    return res.status(404).send({ error: "Book not found" });
  }

  res.send(book);
});

// POST /api/books - Create book
router.post("/", async (req, res) => {
  const book = await books.create(req.body);
  res.status(201).send(book);
});

// PUT /api/books/:id - Update book
router.put("/:id", async (req, res) => {
  const book = await books.update(req.params.id, req.body);
  if (!book) {
    return res.status(404).send({ error: "Book not found" });
  }

  res.send(book);
});

// DELETE /api/books/:id - Delete book
router.delete("/:id", async (req, res) => {
  const deleted = await books.delete(req.params.id);
  if (!deleted) {
    return res.status(404).send({ error: "Book not found" });
  }

  res.send();
});

// Export router
export default router;
