import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low, JSONFile } from "lowdb";

import { Book } from "../types";

interface Data {
  books: Book[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "db.json");
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// Set some defaults (required if your JSON file is empty)
db.data = db.data || { books: [] };

console.log({ db, books: db.data.books });

//db.data.books.push({ id: "1", title: "test" });

export default db;
