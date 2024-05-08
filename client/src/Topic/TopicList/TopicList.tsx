import { useState } from 'react';
import { TopicRepo } from '../TopicRepo';
import { TopicForm } from '../TopicForm';
import { TopicDTO } from '../TopicDTO';
import { TopicListItem } from './TopicListItem';

type TopicListProps = {
  bookId: number;
};

export const TopicList: React.FC<TopicListProps> = ({ bookId }) => {
  const { data: topics, isSuccess } = TopicRepo.useList(bookId);
  const { mutateAsync: createTopic } = TopicRepo.useCreate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (data: TopicDTO) => {
    await createTopic(data);
    setIsCreating(false);
  };

  if (!isSuccess) return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div className="m-10">
      <h2 className="text-2xl text-left">Topics</h2>
      {topics.length === 0 && <p>No topics found</p>}
      {topics.map((topic) => (
        <TopicListItem key={topic.id} topic={topic} />
      ))}
      {!isCreating && (
        <button className="btn btn-primary float-left" onClick={() => setIsCreating(true)}>
          Create Topic
        </button>
      )}
      {isCreating && <TopicForm bookId={bookId} onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />}
    </div>
  );
};
