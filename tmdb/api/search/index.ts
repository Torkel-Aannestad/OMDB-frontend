import { Movie, Serie } from "@/tmdb/models";

import { api } from "../api";
import { ListResponse } from "../types";
import { SearchRequestParams } from "./types";

function multi({ query, page = "1" }: SearchRequestParams) {
  return api.fetcher<ListResponse<Movie | Serie>>({
    endpoint: "/search/multi",
    params: {
      query,
      page,
      include_adult: "false",
    },
  });
}

function movies({ query, page = "1" }: SearchRequestParams) {
  return api.fetcher<ListResponse<Movie>>({
    endpoint: "/search/multi",
    params: {
      query,
      page,
      include_adult: "false",
    },
  });
}

function series({ query, page = "1" }: SearchRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: "/search/multi",
    params: {
      query,
      page,
      include_adult: "false",
    },
  });
}

export const search = {
  multi,
  movies,
  series,
};
