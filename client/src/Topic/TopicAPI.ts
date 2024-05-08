import { TopicDTO, TopicWithBookDTO } from './TopicDTO';

export const TopicAPI = {
  getList: async (bookId: number): Promise<TopicDTO[]> => {
    const response = await fetch(`/api/topics?book_id=${bookId}`);
    return response.json();
  },
  addTopic: async (topic: TopicDTO): Promise<TopicDTO> => {
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(topic)
    });
    return response.json();
  },
  updateTopic: async (topic: TopicDTO): Promise<TopicDTO> => {
    const response = await fetch(`/api/topics/${topic.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(topic)
    });
    return response.json();
  },
  deleteTopic: async (id: number) => {
    await fetch(`/api/topics/${id}`, {
      method: 'DELETE'
    });
    return {};
  },
  searchTopics: async (queryParams: URLSearchParams): Promise<TopicWithBookDTO[]> => {
    const response = await fetch(`/api/topics/search?${queryParams.toString()}`)
    return response.json();
  },
  tagList: async (): Promise<string[]> => {
    const response = await fetch('/api/unique_tags');
    return response.json();
  }
};
