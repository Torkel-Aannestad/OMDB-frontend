export type MovieListType = "popular" | "top_rated" | "upcoming";

export type MovieListRequestParams = {
  list: MovieListType;
  page?: string;
  language?: string;
};

export type MovieDetailsRequestParams = {
  id: string | number;
  append?: string;
};

export type MovieCreditsRequestParams = {
  id: string | number;
};

export type MovieRecommendationsRequestParams = {
  id: string | number;
  page?: string;
};

export type MovieSimilarRequestParams = {
  id: string | number;
  page?: string;
};

export type MovieImagesRequestParams = {
  id: string | number;
  langs?: string;
};

export type MovieVideosRequestParams = {
  id: string | number;
};

export type MovieReviewsRequestParams = {
  id: string | number;
  page?: string;
};
