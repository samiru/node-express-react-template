import { useBookActions } from "../";
import { Book, BooksActionTypes } from "../../../types";
import * as service from "../../../services/books";

describe("useBookActions", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("addBook", () => {
    it("should call add book of service and dispatch add book action", async () => {
      const dispatchMock = jest.fn();
      const book = {
        id: "1",
        title: "The Hobbit",
        description: "A book about a hobbit",
      } as Book;

      const addBookMock = jest
        .spyOn(service, "addBook")
        .mockResolvedValue(book);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { addBook } = useBookActions(dispatchMock);

      await addBook(book);

      expect(addBookMock).toHaveBeenCalledWith(book);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.ADD_BOOK,
        payload: book,
      });
    });
  });

  describe("updateBook", () => {
    it("should call update book of service and dispatch update book action", async () => {
      const dispatchMock = jest.fn();
      const book = {
        id: "1",
        title: "The Hobbit",
        description: "A book about a hobbit",
      } as Book;

      const updateBookMock = jest
        .spyOn(service, "updateBook")
        .mockResolvedValue(book);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { updateBook } = useBookActions(dispatchMock);

      await updateBook(book);

      expect(updateBookMock).toHaveBeenCalledWith(book);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.UPDATE_BOOK,
        payload: book,
      });
    });
  });

  describe("fetchBooks", () => {
    it("should call fetch books of service and dispatch fetch books action", async () => {
      const dispatchMock = jest.fn();
      const books = [
        {
          id: "1",
          title: "The Hobbit",
          description: "A book about a hobbit",
        },
        {
          id: "2",
          title: "The Lord of the Rings",
          description: "A book about a ring",
        },
      ] as Book[];

      const fetchBooksMock = jest
        .spyOn(service, "getBooks")
        .mockResolvedValue(books);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { fetchBooks } = useBookActions(dispatchMock);

      await fetchBooks();

      expect(fetchBooksMock).toHaveBeenCalled();
      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.SET_BOOKS,
        payload: books,
      });
    });
  });

  describe("deleteBook", () => {
    it("should call delete book of service and dispatch delete book action", async () => {
      const dispatchMock = jest.fn();
      const book = {
        id: "1",
        title: "The Hobbit",
        description: "A book about a hobbit",
      } as Book;

      const deleteBookMock = jest
        .spyOn(service, "deleteBook")
        .mockResolvedValue(book);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { deleteBook } = useBookActions(dispatchMock);

      await deleteBook(book.id);

      expect(deleteBookMock).toHaveBeenCalledWith(book.id);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.REMOVE_BOOK,
        payload: { id: book.id },
      });
    });
  });

  describe("selectBook", () => {
    it("should dispatch select book action", () => {
      const dispatchMock = jest.fn();
      const book = {
        id: "1",
        title: "The Hobbit",
        description: "A book about a hobbit",
      } as Book;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { selectBook } = useBookActions(dispatchMock);

      selectBook(book);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.SELECT_BOOK,
        payload: book,
      });
    });
  });

  describe("deSelectBook", () => {
    it("should dispatch deSelect book action", () => {
      const dispatchMock = jest.fn();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { deSelectBook } = useBookActions(dispatchMock);

      deSelectBook();

      expect(dispatchMock).toHaveBeenCalledWith({
        type: BooksActionTypes.DESELECT_BOOK,
        payload: undefined,
      });
    });
  });
});
