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
  api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${list}`,
    params: {
      page,
      region,
    },
  });
}

function detail<T>({ id, append }: SerieDetailsRequestParams) {
  api.fetcher<SerieDetails & T>({
    endpoint: `tv/${id}`,
    params: {
      append_to_response: append,
    },
  });
}

function credits({ id }: SerieCreditsRequestParams) {
  api.fetcher<Credits>({
    endpoint: `tv/${id}/credits`,
  });
}

function recommendations({ id, page }: SerieRecommendationsRequestParams) {
  api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${id}/recommendations`,
    params: {
      page,
    },
  });
}

function similar({ id, page }: SerieSimilarRequestParams) {
  api.fetcher<ListResponse<Serie>>({
    endpoint: `tv/${id}/similar`,
    params: {
      page,
    },
  });
}

function images({ id, langs }: SerieImagesRequestParams) {
  api.fetcher<GetImagesResponse>({
    endpoint: `tv/${id}/images`,
    params: {
      include_image_language: langs,
    },
  });
}

function videos({ id }: SerieVideosRequestParams) {
  api.fetcher<GetVideosResponse>({
    endpoint: `tv/${id}/videos`,
  });
}

function reviews({ id, page }: SerieReviewsRequestParams) {
  api.fetcher<ListResponse<Review>>({
    endpoint: `tv/${id}/reviews`,
    params: {
      page,
    },
  });
}

export const series = {
  list,
  detail,
  credits,
  recommendations,
  similar,
  images,
  videos,
  reviews,
};
