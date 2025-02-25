import { CastCard } from "@/components/cast-card";
import { CrewCard } from "@/components/crew-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tmdb } from "@/tmdb/api";
import { getUniqueItems } from "@/utils/general";

type Props = {
  params: Promise<{ serieid: string }>;
};

export default async function Credits({ params }: Props) {
  const { serieid } = await params;

  const { cast, crew } = await tmdb.series.credits({
    id: serieid,
  });
  const { episodes } = await tmdb.seasons.details({
    id: serieid,
    season: 1,
  });

  const guestStars = getUniqueItems(
    episodes.map((episode) => episode.guest_stars).flat()
  );

  return (
    <div className="space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="text-2xl font-medium">Cast & Crew</h1>
      </div>

      <Tabs defaultValue="cast">
        <TabsList>
          <TabsTrigger value="cast" disabled={cast?.length < 1 && true}>
            Cast
            <span className="pl-1 text-muted-foreground">
              {` (${cast?.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="guests" disabled={guestStars?.length < 1 && true}>
            Guest Stars
            <span className="pl-1 text-muted-foreground">
              {` (${guestStars?.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="crew" disabled={crew?.length < 1 && true}>
            Crew
            <span className="pl-1 text-muted-foreground">
              {` (${crew?.length})`}
            </span>
          </TabsTrigger>
        </TabsList>

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
