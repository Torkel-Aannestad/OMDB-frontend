import {
  Credits,
  GetImagesResponse,
  GetVideosResponse,
  Review,
  Serie,
  SerieDetails,
} from "@/tmdb/models";

import { api } from "../api";
import { ListResponse } from "../types";
import {
  SerieCreditsRequestParams,
  SerieDetailsRequestParams,
  SerieImagesRequestParams,
  SerieListRequestParams,
  SerieRecommendationsRequestParams,
  SerieReviewsRequestParams,
  SerieSimilarRequestParams,
  SerieVideosRequestParams,
} from "./types";

function list({ list, page = "1", region }: SerieListRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${list}`,
    params: {
      page,
      region,
    },
  });
}

function details({ id }: SerieDetailsRequestParams) {
  return api.fetcher<SerieDetails>({
    endpoint: `tv/${id}`,
  });
}

function credits({ id }: SerieCreditsRequestParams) {
  return api.fetcher<Credits>({
    endpoint: `tv/${id}/credits`,
  });
}

function recommendations({ id, page }: SerieRecommendationsRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${id}/recommendations`,
    params: {
      page,
    },
  });
}

function similar({ id, page }: SerieSimilarRequestParams) {
  return api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${id}/similar`,
    params: {
      page,
    },
  });
}

function images({ id, langs }: SerieImagesRequestParams) {
  return api.fetcher<GetImagesResponse>({
    endpoint: `tv/${id}/images`,
    params: {
      include_image_language: langs,
    },
  });
}

function videos({ id }: SerieVideosRequestParams) {
  return api.fetcher<GetVideosResponse>({
    endpoint: `tv/${id}/videos`,
  });
}

function reviews({ id, page }: SerieReviewsRequestParams) {
  return api.fetcher<ListResponse<Review>>({
    endpoint: `tv/${id}/reviews`,
    params: {
      page,
    },
  });
}

export const series = {
  list,
  details,
  credits,
  recommendations,
  similar,
  images,
  videos,
  reviews,
};
