import React from "react";
import { BookForm } from "./BookForm";
import { BookRepo } from "../BookRepo";

type BookCreateProps = {
  onSelect: (id: number) => void;
  onCancel: VoidFunction;
};

export const BookCreate: React.FC<BookCreateProps> = ({onCancel, onSelect}) => {
  const { mutateAsync } = BookRepo.useCreate();

  const handleCreate = async (book: any) => {
    const result = await mutateAsync(book);
    if (result) onSelect(result.id);
  };

  return (
    <BookForm onCancel={onCancel} onSubmit={handleCreate} />
  );
};