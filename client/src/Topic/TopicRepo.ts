import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TopicAPI } from "./TopicAPI"
import { TopicDTO } from "./TopicDTO";

export const TopicRepo = {
  useList: (bookId: number) => {
    return useQuery({
      queryKey: ['topics', bookId],
      queryFn: () => TopicAPI.getList(bookId),
    })
  },
  useCreate: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (topic: TopicDTO) => TopicAPI.addTopic(topic),
      onSuccess: (_, topic) => {
        queryClient.invalidateQueries({
          queryKey: ['topics', topic.book_id],
        });
      }
    });
  },
  useUpdate: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (topic: TopicDTO) => TopicAPI.updateTopic(topic),
      onSuccess: (_, topic) => {
        queryClient.invalidateQueries({
          queryKey: ['topics', topic.book_id],
        });
      }
    });
  },
  useDelete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (params: {topicId: number, bookId: number}) => TopicAPI.deleteTopic(params.topicId),
      onSuccess: (_, params) => {
        queryClient.invalidateQueries({
          queryKey: ['topics', params.bookId],
        });
      }
    });
  },

  useTags: () => {
    return useQuery({
      queryKey: ['tags'],
      queryFn: TopicAPI.tagList,
    });
  }
};