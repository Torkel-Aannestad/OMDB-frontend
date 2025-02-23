import { Image } from "@/tmdb/models";
export type ListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type WithImages = {
  images: {
    posters: Image[];
    backdrops: Image[];
    logos: Image[];
    profiles: Image[];
  };
};
