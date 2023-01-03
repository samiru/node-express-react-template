import express from "express";
import { default as books } from "../services/books.js";
import { Book } from "../types.js";

// Create router
const router = express.Router();

// GET /api/books - List books
router.get("/", async (req, res) => {
  res.send(await books.getAll());
});

// GET /api/books/:id - Get book
router.get("/:id", (req, res) => {
  res.send(`Get book with id ${req.params.id}`);
});

// POST /api/books - Create book
router.post("/", (req, res) => {
  res.send("Create book");
});

// PUT /api/books/:id - Update book
router.put("/:id", (req, res) => {
  res.send(`Update book with id ${req.params.id}`);
});

// DELETE /api/books/:id - Delete book
router.delete("/:id", (req, res) => {
  res.send(`Delete book with id ${req.params.id}`);
});

// Export router
export default router;
