import { CastCard } from "@/components/cast-card";
import { CrewCard } from "@/components/crew-card";
import { MediaDetailsSubView } from "@/components/media-details-sub-view";
import { SerieEpisodeCard } from "@/components/serie-episode-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils";
import { getUniqueItems } from "@/utils/general";

type Props = {
  params: Promise<{ serieid: string; seasonnumber: string }>;
};

export default async function Similar({ params }: Props) {
  const { serieid, seasonnumber } = await params;

  const { name, poster_path, episodes, air_date } = await tmdb.seasons.details({
    id: serieid,
    season: seasonnumber,
  });

  const { cast, crew } = await tmdb.seasons.credits({
    id: serieid,
    season: seasonnumber,
  });
  const guestStars = getUniqueItems(
    episodes.map((episode) => episode.guest_stars).flat()
  );

  const year = format.year(air_date);

  return (
    <div className="space-y-8">
      <MediaDetailsSubView.Top
        name={name}
        year={year.toString()}
        hrefBackLink={`/series/${serieid}/seasons`}
        posterUrl={poster_path}
      />
      <Tabs defaultValue="episodes">
        <TabsList>
          <TabsTrigger value="episodes" disabled={episodes?.length < 1 && true}>
            Episodes
          </TabsTrigger>
          <TabsTrigger value="cast" disabled={cast?.length < 1 && true}>
            Cast
          </TabsTrigger>
          <TabsTrigger value="guests" disabled={guestStars?.length < 1 && true}>
            Guest Stars
          </TabsTrigger>
          <TabsTrigger value="crew" disabled={crew?.length < 1 && true}>
            Crew
          </TabsTrigger>
        </TabsList>

        <TabsContent value="episodes">
          {episodes?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {episodes.map((episode) => (
                <SerieEpisodeCard key={episode.id} {...episode} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No episodes</div>
          )}
        </TabsContent>

        <TabsContent value="cast">
          {cast?.length ? (
            <div className="grid-list">
              {cast.map((cast) => (
                <CastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No cast</div>
          )}
        </TabsContent>

        <TabsContent value="guests">
          {guestStars?.length ? (
            <div className="grid-list">
              {guestStars.map((cast) => (
                <CastCard key={cast.credit_id} {...cast} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No guest stars</div>
          )}
        </TabsContent>

        <TabsContent value="crew">
          {crew?.length ? (
            <div className="grid-list">
              {crew.map((crew) => (
                <CrewCard key={crew.credit_id} {...crew} />
              ))}
            </div>
          ) : (
            <div className="empty-box">No crew</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
