import { Movie } from "./movies";
import { Serie } from "./series";
import { WithMediaType } from "./shared";

export type Person = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  known_for_department: string;
  gender: number;
  popularity: number;
  known_for: Array<Movie | Serie>;
  adult: boolean;
};
export type PersonWithMediaType = WithMediaType<Person, "person">;

export type PersonDetails = {
  id: number;
  name: string;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday?: string;
  gender: number;
  homepage?: string;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  adult: boolean;
};
