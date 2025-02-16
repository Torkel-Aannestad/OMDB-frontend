"use client";
import { ListPagination } from "./list-pagination";
import { MovieCard } from "./movie-card";
import {
  Movie,
  MovieWithMediaType,
  Serie,
  SerieWithMediaType,
} from "@/tmdb/models";
import { MediaListNav } from "./media-list-nav";
import { SerieCard } from "./serie-card";

type MediaListProps = {
  title?: string;
  description?: string;
  movies?: Movie[];
  series?: Serie[];
  currentPage: number;
  totalPages: number;
  showListOptions?: boolean;
  showCatgeoryOptions?: boolean;
};

export function MediaListView({
  title,
  movies,
  series,
  currentPage,
  totalPages,
  showListOptions = false,
  showCatgeoryOptions = false,
}: MediaListProps) {
  return (
    <div className="space-y-8">
      {showListOptions && (
        <MediaListNav.Main>
          <MediaListNav.List>
            <MediaListNav.Item
              href={`/${movies ? "movies" : "series"}/popular`}
              title="Popular"
            />
            <MediaListNav.Item
              href={`/${movies ? "movies" : "series"}/top-rated`}
              title="Top Rated"
            />
            <MediaListNav.Item
              href={`/${movies ? "movies" : "series"}/categories`}
              title="Categories"
            />
          </MediaListNav.List>
          {showCatgeoryOptions && (
            <MediaListNav.Categories media_type={movies ? "movie" : "serie"} />
          )}
        </MediaListNav.Main>
      )}

      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
      </div>

      <div className="grid-list">
        {movies?.map((item) => {
          return <MovieCard key={item.id} {...item} />;
        }) ?? ""}
        {series?.map((item) => {
          return <SerieCard key={item.id} {...item} />;
        }) ?? ""}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
