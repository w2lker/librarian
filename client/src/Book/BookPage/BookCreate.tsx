import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookHeader } from '../../Header/BookHeader';
import { BookRepo } from '../BookRepo';
import { BookForm } from './BookForm';

export const BookCreate: React.FC = () => {
  const navigate = useNavigate();

  const { mutateAsync } = BookRepo.useCreate();

  const handleCreate = async (book: any) => {
    const result = await mutateAsync(book);
    if (result) navigate(`/book/${result.id}`);
  };

  return (
    <>
      <BookHeader />
      <BookForm onCancel={() => navigate(-1)} onSubmit={handleCreate} />
    </>
  );
};
