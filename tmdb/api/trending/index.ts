import {
  MovieWithMediaType,
  PersonWithMediaType,
  SerieWithMediaType,
} from "@/tmdb/models";
import { api } from "../api";
import { ListResponse } from "../types";
import { TrendingRequestParams } from "./types";

function movies({
  time,
  page = "1",
  language = "en-US",
}: TrendingRequestParams) {
  return api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `trending/movie/${time}`,
    params: {
      page,
      language,
    },
  });
}

function series({
  time,
  page = "1",
  language = "en-US",
}: TrendingRequestParams) {
  return api.fetcher<ListResponse<SerieWithMediaType>>({
    endpoint: `trending/tv/${time}`,
    params: {
      page,
      language,
    },
  });
}

function overall({
  time,
  page = "1",
  language = "en-US",
}: TrendingRequestParams) {
  return api.fetcher<
    ListResponse<MovieWithMediaType | SerieWithMediaType | PersonWithMediaType>
  >({
    endpoint: `trending/all/${time}`,
    params: {
      page,
      language,
    },
  });
}

export const trending = {
  overall,
  movies,
  series,
};
