import { Container } from "./container";
import { ListPagination } from "./list-pagination";
import { MovieCard } from "./movie-card";
import { Movie, Serie } from "@/tmdb/models";
import { SerieCard } from "./serie-card";

type SerieListProps = {
  title?: string;
  description?: string;
  items: Serie[];
  currentPage: number;
  totalPages: number;
};

export function SerieList({
  title,
  description,
  items,
  currentPage,
  totalPages,
}: SerieListProps) {
  return (
    <div className="space-y-8">
      <div>List navigation here</div>
      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
      </div>

      <div className="grid-list">
        {items.map((item) => {
          return <SerieCard key={item.id} {...item} />;
        })}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
