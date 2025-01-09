import { Credits, SeasonDetails } from "@/tmdb/models";

import { api } from "../api";
import { SerieSeasonsDetailsRequestParams } from "./types";

function details({ id, season }: SerieSeasonsDetailsRequestParams) {
  api.fetcher<SeasonDetails>({
    endpoint: `tv/${id}/season/${season}`,
  });
}

function credits({ id, season }: SerieSeasonsDetailsRequestParams) {
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/credits`,
  });
}

function aggregateCredits({ id, season }: SerieSeasonsDetailsRequestParams) {
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/aggregate_credits`,
  });
}

export const seasons = {
  details,
  credits,
  aggregateCredits,
};
