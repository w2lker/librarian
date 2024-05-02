import { TopicRepo } from "./TopicRepo";

type TopicDeleteProps = {
  topicId: number;
  bookId: number;
};

export const TopicDelete: React.FC<TopicDeleteProps> = ({topicId, bookId}) => {
  const { mutate } = TopicRepo.useDelete();
  const handleDeleteDialogOpen = () => {
    const deleteDialog = document.getElementById(`topic-delete-modal-${topicId}`) as any;
    deleteDialog.showModal();
  };

  const performDelete =() => mutate({ topicId, bookId });

  return (
    <>
      <button  className="btn btn-sm btn-outline btn-neutral" onClick={handleDeleteDialogOpen}>Delete</button>
      <dialog id={`topic-delete-modal-${topicId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Removal confirmation</h3>
          <p className="py-4">You are about to permanently delete this topic. Once deleted, this action cannot be undone. Please confirm your decision.</p>
          <div className="modal-action justify-center">
            <form method="dialog">
              <button className="btn btn-error mr-4" onClick={performDelete}>Delete</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
