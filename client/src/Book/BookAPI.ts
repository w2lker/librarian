import { BookDTO } from "./BookDTO";

type BookPageDTO = {
  data: BookDTO[],
  page: string,
  hasNext: boolean,
}

export const BookAPI = {
  getBooks: async (page: number): Promise<BookPageDTO> => {
    const response = await fetch('/api/books?page=' + page);
    return response.json();
  },
  getBook: async (id: number): Promise<BookDTO> => {
    const response = await fetch(`/api/books/${id}`);
    return response.json();
  },
  addBook: async (book: BookDTO): Promise<BookDTO> => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },
  updateBook: async (book: BookDTO): Promise<BookDTO> => {
    const response = await fetch(`/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },
  deleteBook: async (id: number) => {
    await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });
    return {};
  },
};