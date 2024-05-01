import { useState } from "react";

import { BookRepo } from "../BookRepo";
import { BookForm } from "./BookForm";
import { BookData } from "./BookData";
import { BookDTO } from "../BookDTO";
import { TopicList } from "../../Topic/TopicList";

type BookPageProps = {
  bookId: number;
  onClose: VoidFunction;
};

export const BookPage: React.FC<BookPageProps> = ({bookId, onClose}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: book, isSuccess } = BookRepo.useItem(bookId);
  const { mutateAsync } = BookRepo.useUpdate();

  const handleCreate = async (book: BookDTO) => {
    const result = await mutateAsync(book);
    if (result.id) setIsEditing(false);
  };

  if (!isSuccess) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <>
      {isEditing && (
        <BookForm
          book={book}
          onSubmit={handleCreate}
          onCancel={() => setIsEditing(false)}
        />
      )}
      {!isEditing && (
        <BookData
          book={book}
          onEdit={() => setIsEditing(true)}
          onDelete={onClose}
        />
      )}
      <TopicList bookId={bookId} />
    </>
  );
};
