import axios from "axios";

const baseURL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getBooks() {
  try {
    const response = await axios.get(`${baseURL}/api/books`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
