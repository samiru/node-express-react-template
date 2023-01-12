import axios from "axios";
import { Book } from "../types";

const baseURL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getBooks(): Promise<Book[]> {
  try {
    const response = await axios.get(`${baseURL}/api/books`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBook(id: string): Promise<Book> {
  try {
    const response = await axios.get(`${baseURL}/api/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
