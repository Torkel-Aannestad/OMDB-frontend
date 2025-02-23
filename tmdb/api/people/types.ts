import { CombinedCreditsResponse } from "@/tmdb/models/combined-credits";

export type PeopleListType = "popular";

export type PersonDetailsRequestParams = {
  id: string | number;
  append?: string;
};

export type PeopleListRequestParams = {
  list: PeopleListType;
  page?: string;
  language?: string;
};

export type WithCombinedCredits = {
  combined_credits: CombinedCreditsResponse;
};
