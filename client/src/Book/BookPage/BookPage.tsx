import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookHeader } from '../../Header/BookHeader';
import { TopicList } from '../../Topic/TopicList/TopicList';
import { BookDTO } from '../BookDTO';
import { BookRepo } from '../BookRepo';
import { BookData } from './BookData';
import { BookForm } from './BookForm';

export const BookPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookId = parseInt(id || '');
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
      <BookHeader />
      {isEditing && <BookForm book={book} onSubmit={handleCreate} onCancel={() => setIsEditing(false)} />}
      {!isEditing && <BookData book={book} onEdit={() => setIsEditing(true)} onDelete={() => navigate('/')} />}
      <TopicList bookId={bookId} />
    </>
  );
};
