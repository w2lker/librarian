import { BookDTO } from '../Book/BookDTO';

export type TopicDTO = {
  id: number;
  book_id: number;
  tag: string;
  description: string;
};

export type TopicWithBookDTO = TopicDTO & {
  book: BookDTO;
};
