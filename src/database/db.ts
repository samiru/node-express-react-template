import { join } from "node:path";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Book } from "../types.js";

interface Data {
  books: Book[];
}

// Use JSON file for storage
//const __dirname = path.dirname(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = join(__dirname, "db.json");

console.log({ __filename, __dirname, file });

const adapter = new JSONFile<Data>(file);

console.log({ adapter });

// Initialize the db using the default file adapter
const db = new Low(adapter);

//db.get("books").push({ id: 1, title: "test", description: "xxx", author: "Smith, John" j}).write(

// Read data from JSON file, this will set db.data content
db.read();

// Set some defaults (required if your JSON file is empty)
db.data = db.data || { books: [] };

console.log({ db, books: db.data?.books });

//db.data.books.push({ id: "1", title: "test" });

export default db;
