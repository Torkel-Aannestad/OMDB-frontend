import { MediaCard } from "@/components/media-card";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { MediaImages } from "@/components/media-image";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils/format";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ serieid: string }>;
};

export default async function Similar({ params }: Props) {
  const { serieid } = await params;

  const serieDetails = await tmdb.series.details({
    id: serieid,
  });

  if (!serieDetails?.seasons.length) {
    return notFound();
  }
  const year = format.year(serieDetails.first_air_date);
  return (
    <>
      <MediaDetailsSubView.Top
        name={serieDetails.name}
        year={year.toString()}
        hrefBackLink={`/series/${serieid}`}
        posterUrl={serieDetails.poster_path}
      />
      <div className=" space-y-8">
        <div className="md:mb-12 md:mt-6">
          <h1 className="mb-2 text-2xl font-medium">Seasons</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {serieDetails.seasons.map((item) => {
            return (
              <Link
                href={`/series/${serieDetails.id}/seasons/${item.id}`}
                key={item.id}
                prefetch={true}
              >
                <MediaCard.Root>
                  <MediaImages.Poster
                    image={item.poster_path}
                    alt={item.name}
                    priority
                  />
                  <MediaCard.Content>
                    <MediaCard.Title>{item.name}</MediaCard.Title>
                    <MediaCard.Excerpt>
                      {item.episode_count} episodes
                    </MediaCard.Excerpt>
                  </MediaCard.Content>
                </MediaCard.Root>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
