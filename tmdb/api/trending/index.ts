import {
  Movie,
  MovieWithMediaType,
  PersonWithMediaType,
  Serie,
  SerieWithMediaType,
} from "@/tmdb/models";
import { api } from "../api";
import { ListResponse } from "../types";
import { TrendingRequestParams } from "./types";

function movies({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
    },
  });
}

function series({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<ListResponse<SerieWithMediaType>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
    },
  });
}

function overall({ time, page = "1" }: TrendingRequestParams) {
  return api.fetcher<
    ListResponse<MovieWithMediaType | SerieWithMediaType | PersonWithMediaType>
  >({
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
