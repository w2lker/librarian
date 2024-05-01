import { TopicRepo } from "./TopicRepo";

type TopicListProps = {
  bookId: number;
};

export const TopicList: React.FC<TopicListProps> = ({ bookId }) => {
  const { data: topics, isSuccess } = TopicRepo.useList(bookId);
  if (!isSuccess) return <span className="loading loading-spinner loading-lg"></span>;
  console.log(topics);
  return <div>TopicList</div>;
}