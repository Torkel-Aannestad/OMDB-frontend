import {
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  WithMediaType,
} from "./shared";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  video: boolean;
  adult: boolean;
};

export type MovieWithMediaType = WithMediaType<Movie, "movie">;

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  video: boolean;
  belongs_to_collection: BelongsToCollection;
  adult: boolean;
};

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};
