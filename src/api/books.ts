import express from "express";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The Hobbit is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
  },
  {
    id: 2,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
  },
];

// Create router
const router = express.Router();

// GET /api/books - List books
router.get("/", (req, res) => {
  console.log({ req });
  res.send(books);
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
