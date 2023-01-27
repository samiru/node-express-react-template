import axios from "axios";
import { Book } from "../types";

const baseURL = process.env.API_BASE_URL || "http://localhost:3001";

const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get(`${baseURL}/api/books`);
  return response.data;
};

const getBook = async (id: string): Promise<Book> => {
  const response = await axios.get(`${baseURL}/api/book/${id}`);
  return response.data;
};

const addBook = async (book: Book): Promise<Book> => {
  const response = await axios.post(`${baseURL}/api/books`, book);
  return response.data;
};

const updateBook = async (book: Book): Promise<Book> => {
  const response = await axios.put(`${baseURL}/api/books/${book.id}`, book);
  return response.data;
};

const deleteBook = async (id: string): Promise<Book> => {
  const response = await axios.delete(`${baseURL}/api/books/${id}`);
  return response.data;
};

export { getBooks, getBook, addBook, updateBook, deleteBook };
