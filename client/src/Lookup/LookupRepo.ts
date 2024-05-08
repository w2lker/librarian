import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { TopicAPI } from "../Topic/TopicAPI";
import { LookupQueryDTO } from "./LookupQueryDTO";

const getEmptyQuery = (): LookupQueryDTO => ({
  tag: "",
  description: "",
  book_name: "",
  author: "",
  ISBN: "",
  publisher: "",
  skill: "",
});

export const LookupRepo = {
  useParamQuery: () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = getEmptyQuery();
    searchParams.forEach((value, key) => {
      const data = key === "year" ? parseInt(value, 10) : value;
      // @ts-ignore
      searchQuery[key] = data;
    });

    const setSearchQuery = (query: LookupQueryDTO) => {
      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (!!value) {
          searchParams.append(key, value.toString());
        }
      });
      navigate(location.pathname + "?" + searchParams.toString());
    };

    return { setSearchQuery, searchQuery, searchParams };
  },

  useSearch: (params: URLSearchParams) => {
    return useQuery({
      queryKey: ['lookup', params.toString()],
      queryFn: () => TopicAPI.searchTopics(params),
      staleTime: 1000 * 60 * 5
    });
  }
}