import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BookAPI } from "./BookAPI"
import { BookDTO } from "./BookDTO"

export const BookRepo = {
  useList: () => {
    return useInfiniteQuery({
      queryKey: ['books'],
      queryFn: ({ pageParam }) => BookAPI.getBooks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.hasNext ? parseInt(lastPage.page) + 1 : undefined,
    })
  },

  useItem: (id: number) => {
    return useQuery({
      queryKey: ["book", id],
      queryFn: () => BookAPI.getBook(id),
    })
  },

  useCreate: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (book: BookDTO) => BookAPI.addBook(book),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
        queryClient.invalidateQueries({
          queryKey: ["book", data.id],
        });
      }
    });
  },

  useUpdate: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (book: BookDTO) => BookAPI.updateBook(book),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
        queryClient.invalidateQueries({
          queryKey: ["book", data.id],
        });
      }
    });
  },

  useDelete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => BookAPI.deleteBook(id),
      onSuccess: (_data, id) => {
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
        queryClient.invalidateQueries({
          queryKey: ["book", id],
        });
      }
    });
  }
}