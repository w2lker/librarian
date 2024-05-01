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
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['topics', data.bookId],
        });
      }
    });
  },
  useUpdate: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (topic: TopicDTO) => TopicAPI.updateTopic(topic),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['topics', data.bookId],
        });
      }
    });
  },
};