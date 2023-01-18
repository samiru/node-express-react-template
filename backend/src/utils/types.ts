export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HTTPError extends Error {
  status?: HTTPStatus;

  constructor(message: string, status?: HTTPStatus) {
    super(message);
    this.status = status;
  }
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  notes?: string;
}

export type NewBook = Omit<Book, "id">;
