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
  const id = parseInt(req.params.id);
  res.send(await books.get(id));
});

// POST /api/books - Create book
router.post("/", async (req, res) => {
  const book = await books.create(req.body);
  res.status(201).send(book);
});

// PUT /api/books/:id - Update book
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await books.update(id, req.body);
  res.send(book);
});

// DELETE /api/books/:id - Delete book
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(`Delete book with id ${req.params.id}`);
});

// Export router
export default router;
