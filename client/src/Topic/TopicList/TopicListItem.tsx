import { useState } from "react";
import { TopicDTO } from "../TopicDTO";
import { TopicRepo } from "../TopicRepo";
import { TopicForm } from "../TopicForm";
import { TopicDelete } from "../TopicDelete";

type TopicListItemProps = {
  topic: TopicDTO;
};

export const TopicListItem: React.FC<TopicListItemProps> = ({ topic }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: updateTopic } = TopicRepo.useUpdate();

  const handleUpdate = async (data: TopicDTO) => {
    await updateTopic(data);
    setIsEditing(false);
  }

  if (isEditing) return <TopicForm topic={topic} bookId={topic.book_id} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} />;

  return (
    <div key={topic.id} className="card w-100% bg-base-100 shadow-xl mb-10">
      <div className="card-body">
        <h2 className="card-title">{topic.tag}</h2>
        <p className="text-left">{topic.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-outline btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          <TopicDelete topicId={topic.id} bookId={topic.book_id} />
        </div>
      </div>
    </div>
  )
};