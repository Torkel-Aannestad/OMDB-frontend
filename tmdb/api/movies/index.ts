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

const detail = <T>({ id, append }: MovieDetailsRequestParams) =>
  api.fetcher<MovieDetails & T>({
    endpoint: `movie/${id}`,
    params: {
      append_to_response: append,
    },
  });

const credits = ({ id }: MovieCreditsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `movie/${id}/credits`,
  });

const recommendations = ({ id, page }: MovieRecommendationsRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/recommendations`,
    params: {
      page,
    },
  });

const similar = ({ id, page }: MovieSimilarRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `movie/${id}/similar`,
    params: {
      page,
    },
  });

const images = ({ id, langs }: MovieImagesRequestParams) =>
  api.fetcher<GetImagesResponse>({
    endpoint: `movie/${id}/images`,
    params: {
      include_image_language: langs,
    },
  });

const videos = ({ id }: MovieVideosRequestParams) =>
  api.fetcher<GetVideosResponse>({
    endpoint: `movie/${id}/videos`,
  });

const reviews = ({ id, page }: MovieReviewsRequestParams) =>
  api.fetcher<ListResponse<Review>>({
    endpoint: `movie/${id}/reviews`,
    params: {
      page,
    },
  });

export const movie = {
  list,
  detail,
  credits,
  recommendations,
  similar,
  images,
  videos,
  reviews,
};
