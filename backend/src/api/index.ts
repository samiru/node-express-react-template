import express from "express";
import books from "./books";

// Create router
const router = express.Router();

// Use book router for /books route
router.use("/books", books);

// Export router
export default router;
