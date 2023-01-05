export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  notes?: string;
}

export type NewBook = Omit<Book, "id">;
