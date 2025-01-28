import {
  Credits,
  Movie,
  MovieDetails,
  Review,
  GetImagesResponse,
  GetVideosResponse,
} from "@/tmdb/models";

import { api } from "../api";
import { ListResponse } from "../types";
import {
  MovieCreditsRequestParams,
  MovieDetailsRequestParams,
  MovieImagesRequestParams,
  MovieListRequestParams,
  MovieRecommendationsRequestParams,
  MovieReviewsRequestParams,
  MovieSimilarRequestParams,
  MovieVideosRequestParams,
} from "./types";

function list({ list, page, region }: MovieListRequestParams) {
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${list}`,
    params: {
      page,
      region,
    },
  });
}

function details({ id }: MovieDetailsRequestParams) {
  return api.fetcher<MovieDetails>({
    endpoint: `movie/${id}`,
  });
}

function credits({ id }: MovieCreditsRequestParams) {
  api.fetcher<Credits>({
    endpoint: `movie/${id}/credits`,
  });
}

function recommendations({ id, page }: MovieRecommendationsRequestParams) {
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/recommendations`,
    params: {
      page,
    },
  });
}

function similar({ id, page }: MovieSimilarRequestParams) {
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/similar`,
    params: {
      page,
    },
  });
}

function images({ id, langs }: MovieImagesRequestParams) {
  api.fetcher<GetImagesResponse>({
    endpoint: `movie/${id}/images`,
    params: {
      include_image_language: langs,
    },
  });
}

function videos({ id }: MovieVideosRequestParams) {
  api.fetcher<GetVideosResponse>({
    endpoint: `movie/${id}/videos`,
  });
}

function reviews({ id, page }: MovieReviewsRequestParams) {
  api.fetcher<ListResponse<Review>>({
    endpoint: `movie/${id}/reviews`,
    params: {
      page,
    },
  });
}

export const movie = {
  list,
  details,
  credits,
  recommendations,
  similar,
  images,
  videos,
  reviews,
};
