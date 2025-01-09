const baseUrl = "https://api.themoviedb.org/3";

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_KEY}`,
};

const defaultParams: Record<string, string> = {
  language: "en-US",
};

type FetcherOptions = {
  endpoint: string;
  params?: Record<string, string | undefined>;
};

type Fetcher = <T>(options: FetcherOptions, init?: RequestInit) => Promise<T>;

function sanitizeParams(params?: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined)
  );
}

function createSearchParams(params: Record<string, string | undefined>) {
  const sanitizedParams = sanitizeParams(params);
  const mergedParams: Record<string, string> = {
    ...defaultParams,
    ...sanitizedParams,
  } as Record<string, string>;
  return new URLSearchParams(mergedParams).toString();
}

function createHeaders(init?: RequestInit): Headers {
  const headers = init?.headers ?? {};
  const mergedHeaders = { ...defaultHeaders, ...headers };
  return new Headers(mergedHeaders);
}

const fetcher: Fetcher = async ({ endpoint, params }, init?) => {
  const _params = createSearchParams(params ?? {});
  const _headers = createHeaders(init);

  const _init = {
    ...init,
    next: { revalidate: 600, ...init?.next },
    headers: _headers,
  };

  const url = `${baseUrl}/${endpoint}?${_params}`;
  const response = await fetch(url, _init);

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}: ${response.statusText}`
    );
  }

  return await response.json();
};

export const api = {
  fetcher,
};
