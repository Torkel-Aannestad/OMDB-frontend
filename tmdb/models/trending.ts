import { Genre } from "./shared";

export type GeneralMediaItem = {
  id: number;
  name: string; //serie
  title: string; //movie
  original_title: string;
  original_name: string;
  overview: string;
  genre_ids: Genre[];
  poster_path: string;
  backdrop_path: string;
  media_type: string;
  first_air_date: string;
  original_language: string;
  origin_country: string[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
};
