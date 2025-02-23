"use client";
import { ListPagination } from "./list-pagination";
import { MovieCard } from "./movie-card";
import { Movie, Serie } from "@/tmdb/models";
import { MediaListNav } from "./media-list-nav";
import { SerieCard } from "./serie-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TabsLink } from "./ui/tabs";
import { Skeleton } from "./ui/skeleton";
import { MediaCard } from "./media-card";

type MediaListProps = {
  title?: string;
  description?: string;
  movies?: Movie[];
  series?: Serie[];
  currentPage: number;
  totalPages: number;
  showListOptions?: boolean;
  showCatgeoryOptions?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
};

export function MediaListView({
  title,
  movies,
  series,
  currentPage,
  totalPages,
  showListOptions = false,
  showCatgeoryOptions = false,
  backButtonHref,
  backButtonText,
}: MediaListProps) {
  return (
    <div className=" space-y-8">
      {backButtonHref && (
        <div className="relative h-6 px-2">
          <Link className="absolute group transition " href={backButtonHref}>
            <div className="flex items-center text-xs text-secondary-foreground group-hover:text-foreground">
              <ArrowLeft className="size-3 group-hover:-translate-x-1 duration-300" />
              {backButtonText ? backButtonText : "Back"}
            </div>
          </Link>
        </div>
      )}
      {showListOptions && (
        <MediaListNav.Main>
          <MediaListNav.ListTabs>
            <TabsLink
              href={`/${movies ? "movies" : "series"}/popular`}
              title="Popular"
            >
              Popular
            </TabsLink>
            <TabsLink href={`/${movies ? "movies" : "series"}/top-rated`}>
              Top Rated
            </TabsLink>
            <TabsLink href={`/${movies ? "movies" : "series"}/categories`}>
              Categories
            </TabsLink>
          </MediaListNav.ListTabs>
          {showCatgeoryOptions && (
            <MediaListNav.Categories media_type={movies ? "movie" : "serie"} />
          )}
        </MediaListNav.Main>
      )}

      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{title}</h1>
      </div>

      <div className="grid-list">
        {movies?.map((item, idx) => {
          return (
            <MovieCard
              key={item.id}
              priority={idx < 10 ? true : false}
              {...item}
            />
          );
        }) ?? ""}
        {series?.map((item, idx) => {
          return (
            <SerieCard
              key={item.id}
              priority={idx < 10 ? true : false}
              {...item}
            />
          );
        }) ?? ""}
      </div>

      <ListPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export function MediaListViewSkeleton() {
  return (
    <div className=" space-y-8">
      <div className="md:mb-12 md:mt-6">
        <Skeleton className="h-4" />
      </div>

      <div className="grid-list">
        <div className="flex flex-wrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="basis-1/2 rounded-md pb-4 pr-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Skeleton className="aspect-poster w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
