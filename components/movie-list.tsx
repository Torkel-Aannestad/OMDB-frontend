import { Container } from "./container";
import { ListPagination } from "./list-pagination";
import { MovieCard } from "./movie-card";
import { Movie } from "@/tmdb/models";

type MovieListProps = {
  title?: string;
  description?: string;
  items: Movie[];
  currentPage: number;
  totalPages: number;
};

export function MovieList({
  title,
  description,
  items,
  currentPage,
  totalPages,
}: MovieListProps) {
  return (
    <Container className="mt-28 md:mt-32">
      <div className="space-y-8">
        <div>List navigation here</div>
        <div className="md:mb-12 md:mt-6">
          <h1 className="mb-2 text-2xl font-medium">{title}</h1>
        </div>

        <div className="grid-list">
          {items.map((item) => {
            return <MovieCard key={item.id} {...item} />;
          })}
        </div>

        <ListPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Container>
  );
}
