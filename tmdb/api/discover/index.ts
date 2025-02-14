import { api } from "@/tmdb/api/api";
import { ListResponse } from "@/tmdb/api/types";
import { Movie, Serie } from "@/tmdb/models";
import {
  DiscoverMovieRequestParams,
  DiscoverSerieRequestParams,
} from "./types";

function movie(args: DiscoverMovieRequestParams) {
  return api.fetcher<ListResponse<Movie>>({
    endpoint: "discover/movie",
    params: args as Record<string, string>,
  });
}

function serie(args: DiscoverSerieRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: "discover/tv",
    params: args as Record<string, string>,
  });
}

export const discover = {
  movie,
  serie,
};
