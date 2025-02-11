export type MediaType = "movie" | "serie" | "person";
export type WithMediaType<T, K extends MediaType> = T & {
  media_type: K;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// export type GeneralMediaItem = {
//   id: number;
//   media_type: string;
//   name: string; //serie
//   title: string; //movie
//   original_name: string; //serie
//   original_title: string; //movie
//   overview: string;
//   genre_ids: Genre[];
//   poster_path: string;
//   profile_path: string; //person
//   backdrop_path: string;
//   first_air_date: string; //serie
//   release_date: string; //movie
//   original_language: string;
//   origin_country: string[];
//   popularity: number;
//   vote_average: number;
//   vote_count: number;
//   adult: boolean;
//   known_for_department: string; //person
// };
