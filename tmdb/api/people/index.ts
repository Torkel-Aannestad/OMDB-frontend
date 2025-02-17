import { ListResponse } from "@/tmdb/api/types";
import { Person, PersonDetails } from "@/tmdb/models/people";

import { api } from "../api";
import { PeopleListRequestParams, PersonDetailsRequestParams } from "./types";

function list({ list, page, language = "en-US" }: PeopleListRequestParams) {
  return api.fetcher<ListResponse<Person>>({
    endpoint: `person/${list}`,
    params: {
      page,
      language,
    },
  });
}

function details({ id, append }: PersonDetailsRequestParams) {
  return api.fetcher<PersonDetails>({
    endpoint: `person/${id}`,
    params: {
      append_to_response: append,
    },
  });
}

export const person = {
  list,
  details,
};
