import { Movie, Serie } from "@/tmdb/models";
import { api } from "../api";
import { ListResponse } from "../types";
import { TrendingRequestParams } from "./types";

function movies({ time, page = "1" }: TrendingRequestParams) {
  api.fetcher<ListResponse<Movie>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
    },
  });
}

function series({ time, page = "1" }: TrendingRequestParams) {
  api.fetcher<ListResponse<Serie>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
    },
  });
}

export const trending = {
  movies,
  series,
};
