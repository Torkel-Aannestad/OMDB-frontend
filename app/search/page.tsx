import { Container } from "@/components/container";
import { ListPagination } from "@/components/list-pagination";
import { SearchInput } from "@/components/search-input";
import { SearchResultCard } from "@/components/search-results-card";
import { tmdb } from "@/tmdb/api";

type SearchProps = {
  searchParams: Promise<{ q: string; page: string }>;
};

export default async function Search({ searchParams }: SearchProps) {
  const params = await searchParams;

  const { results, page, total_pages } = await tmdb.search.multi({
    query: params.q,
    page: params.page,
  });

  const trending = (
    await tmdb.trending.overall({ time: "week" })
  ).results.slice(0, 25);

  return (
    <Container className="mt-28 md:mt-32 h-screen">
      <div className="space-y-8">
        <div className="md:mb-12 md:mt-6">
          {/* <h1 className="mb-2 text-2xl font-medium">Search</h1> */}
          <SearchInput />
        </div>
        {results.length ? (
          <div className="grid-list">
            {results.map((result) => {
              return <SearchResultCard key={result.id} media={result} />;
            })}
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-xl font-medium">Trending this week</h1>
            <div className="grid-list">
              {trending.map((result) => {
                return <SearchResultCard key={result.id} media={result} />;
              })}
            </div>
          </>
        )}

        <ListPagination currentPage={page} totalPages={total_pages} />
      </div>
    </Container>
  );
}
