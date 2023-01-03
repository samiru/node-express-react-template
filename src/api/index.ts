import express from "express";
import books from "./books.js";

// Create router
const router = express.Router();

// Use book and author routers for /books and /authors routes
router.use("/books", books);

// Export router
export default router;
