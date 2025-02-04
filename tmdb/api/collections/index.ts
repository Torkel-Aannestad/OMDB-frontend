import { DetailedCollection } from "@/tmdb/models";

import { api } from "../api";
import { CollectionRequestParams } from "./types";

function details({ id }: CollectionRequestParams) {
  return api.fetcher<DetailedCollection>({
    endpoint: `collection/${id}`,
  });
}

export const collections = {
  details,
};
