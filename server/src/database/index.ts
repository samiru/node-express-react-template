import { join } from "node:path";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { Book } from "../utils/types";

interface Schema {
  books: Book[];
}

const connect = () => {
  const file = join(__dirname, "db.json");
  const db = lowdb(new FileSync<Schema>(file));

  // Read data from JSON file, this will set db.data content
  db.read();

  // Set some defaults (required if your JSON file is empty)
  db.defaults({ books: [] }).write();

  return db;
};

export default connect;
