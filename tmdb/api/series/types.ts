export type SerieListType =
  | "popular"
  | "top_rated"
  | "on_the_air"
  | "airing_today";

export type SerieListRequestParams = {
  list: SerieListType;
  page?: string;
  region?: string;
};

export type SerieDetailsRequestParams = {
  id: string;
  append?: string;
};

export type SerieCreditsRequestParams = {
  id: string | number;
};

export type SerieRecommendationsRequestParams = {
  id: string | number;
  page?: string;
};

export type SerieSimilarRequestParams = {
  id: string | number;
  page?: string;
};

export type SerieImagesRequestParams = {
  id: string | number;
  langs?: string;
};

export type SerieVideosRequestParams = {
  id: string | number;
};

export type SerieReviewsRequestParams = {
  id: string | number;
  page?: string;
};
