import axios from "axios";
import { Book } from "../types";

const baseURL = process.env.API_BASE_URL || "http://localhost:3001";

const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(`${baseURL}/api/books`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBook = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${baseURL}/api/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await axios.post(`${baseURL}/api/book`, book);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateBook = async (book: Book): Promise<Book> => {
  try {
    const response = await axios.put(`${baseURL}/api/book/${book.id}`, book);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteBook = async (id: string): Promise<Book> => {
  try {
    const response = await axios.delete(`${baseURL}/api/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getBooks, getBook, addBook, updateBook, deleteBook };
