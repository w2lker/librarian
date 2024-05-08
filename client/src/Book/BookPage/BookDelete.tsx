import { BookRepo } from '../BookRepo';

type BookDeleteProps = {
  bookId: number;
  onDelete: VoidFunction;
};

export const BookDelete: React.FC<BookDeleteProps> = ({ bookId, onDelete }) => {
  const { mutateAsync } = BookRepo.useDelete();
  const handleDeleteDialogOpen = () => {
    const deleteDialog = document.getElementById('book-delete-modal') as any;
    deleteDialog.showModal();
  };

  const performDelete = async () => {
    await mutateAsync(bookId);
    onDelete();
  };

  return (
    <>
      <button className="btn btn-outline btn-neutral mt-4 float-right" onClick={handleDeleteDialogOpen}>
        Delete book
      </button>
      <dialog id="book-delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Removal confirmation</h3>
          <p className="py-4">
            You are about to permanently delete this book. Once deleted, this action cannot be undone. Please confirm your decision.
          </p>
          <div className="modal-action justify-center">
            <form method="dialog">
              <button className="btn btn-error mr-4" onClick={performDelete}>
                Delete
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
