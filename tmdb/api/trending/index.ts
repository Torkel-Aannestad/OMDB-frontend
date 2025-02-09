import { Movie, Serie } from "@/tmdb/models";
import { api } from "../api";
import { ListResponse } from "../types";
import { TrendingRequestParams } from "./types";
import { GeneralMediaItem } from "@/tmdb/models/trending";

function movies({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<ListResponse<Movie>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
    },
  });
}

function series({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
    },
  });
}

function overall({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<ListResponse<GeneralMediaItem>>({
    endpoint: `trending/all/${time}`,
    params: {
      page,
    },
  });
}

export const trending = {
  overall,
  movies,
  series,
};
