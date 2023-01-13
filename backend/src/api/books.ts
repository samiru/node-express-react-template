import express, { NextFunction, Request, Response } from "express";
import books from "../services/books";
import logger from "../utils/logger";
import { BaseError, HTTPStatus } from "../utils/types";

const router = express.Router();

// GET /api/books - List books
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await books.getAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:id - Get book
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await books.get(req.params.id);
    if (!book) {
      logger.warn(`Book with id ${req.params.id} not found`);
      throw new BaseError("Book not found", HTTPStatus.NOT_FOUND);
    }

    res.send(book);
  } catch (error) {
    next(error);
  }
});

// POST /api/books - Create book
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await books.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    next(error);
  }
});

// PUT /api/books/:id - Update book
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await books.update(req.params.id, req.body);
    if (!book) {
      logger.warn(`Book with id ${req.params.id} not found`);
      throw new BaseError("Book not found", HTTPStatus.NOT_FOUND);
    }

    res.send(book);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/books/:id - Delete book
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await books.remove(req.params.id);
      if (!deleted) {
        logger.warn(`Book with id ${req.params.id} not found`);
        throw new BaseError("Book not found", HTTPStatus.NOT_FOUND);
      }

      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
