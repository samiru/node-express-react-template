export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  notes?: string;
}

export type NewBook = Omit<Book, "id">;
