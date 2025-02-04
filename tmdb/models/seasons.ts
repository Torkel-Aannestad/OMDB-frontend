import { Crew } from "./credits";

export type SeasonDetails = {
  id: number;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type Episode = {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  crew: Crew[];
  guest_stars: GuestStar[];
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  show_id: number;
};

type GuestStar = {
  id: number;
  credit_id: string;
  order: number;
  character: string;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};
