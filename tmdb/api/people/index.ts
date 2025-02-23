import { ListResponse } from "@/tmdb/api/types";
import { Person, PersonDetails } from "@/tmdb/models/people";

import { api } from "../api";
import { PeopleListRequestParams, PersonDetailsRequestParams } from "./types";
import { CombinedCreditsResponse } from "@/tmdb/models/combined-credits";

function list({ list, page, language = "en-US" }: PeopleListRequestParams) {
  return api.fetcher<ListResponse<Person>>({
    endpoint: `person/${list}`,
    params: {
      page,
      language,
    },
  });
}

const details = async <T>({ id, append }: PersonDetailsRequestParams) =>
  api.fetcher<PersonDetails & T>({
    endpoint: `person/${id}`,
    params: {
      append_to_response: append,
    },
  });

async function combinedCredits({ id }: PersonDetailsRequestParams) {
  return api.fetcher<CombinedCreditsResponse>({
    endpoint: `person/${id}/combined_credits`,
  });
}
export const person = {
  list,
  details,
};
