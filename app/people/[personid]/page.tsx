import { PosterList } from "@/components/video-image-view";
import { MediaDetailView } from "@/components/media-details-view";
import { tmdb } from "@/tmdb/api";
import { format } from "@/tmdb/utils";
import { MediaImages } from "@/components/media-image";
import { WithCombinedCredits } from "@/tmdb/api/people/types";
import { WithImages } from "@/tmdb/api/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonCreditsTable } from "@/components/person-credits-table";
import {
  filterByDepartment,
  getDepartments,
  getPersonHighlights,
} from "@/utils/people";
import { MovieCard } from "@/components/movie-card";
import { SerieCard } from "@/components/serie-card";

type DetailProps = {
  params: Promise<{ personid: string }>;
};
export default async function Details({ params }: DetailProps) {
  const { personid } = await params;

  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,

    images: { profiles },
    known_for_department: department,
    combined_credits: { cast, crew },
  } = await tmdb.person.details<WithCombinedCredits & WithImages>({
    id: personid,
    append: "combined_credits,images",
  });

  const { heroBackdrop, highlightedItems } = getPersonHighlights({
    cast,
    crew,
    department,
  });

  const info = [birthday && format.date(birthday), place_of_birth]
    .filter(Boolean)
    .join(" — ");
  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaImages.Backdrop alt={name} image={heroBackdrop} priority />
        <div className="overlay-top" />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaImages.Poster
            image={profile_path}
            alt={name}
            size="w780"
            priority
          />
          <div className="overlay-hero-top md:hidden" />
        </MediaDetailView.Poster>
        <div className="space-y-4">
          <MediaDetailView.Title>{name} </MediaDetailView.Title>

          <MediaDetailView.Overview>{info}</MediaDetailView.Overview>
          <MediaDetailView.Overview>{biography}</MediaDetailView.Overview>
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs defaultValue="known">
          <TabsList className="mb-4">
            <TabsTrigger value="known">Known for</TabsTrigger>
            {department === "Acting" && (
              <TabsTrigger value="acting">Acting</TabsTrigger>
            )}
            {getDepartments(crew).map((department) => (
              <TabsTrigger key={department} value={department}>
                {department}
              </TabsTrigger>
            ))}
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="known">
            {highlightedItems.length > 0 ? (
              <div className="grid-list">
                {highlightedItems?.map((item) =>
                  item.media_type === "movie" ? (
                    <MovieCard key={item.id} {...item} />
                  ) : (
                    <SerieCard key={item.id} {...item} />
                  )
                )}
              </div>
            ) : (
              <div className="empty-box">No credits</div>
            )}
          </TabsContent>

          <TabsContent value="acting">
            <TabsContent value="acting">
              <PersonCreditsTable department="Acting" credits={cast} />
            </TabsContent>
          </TabsContent>
          {getDepartments(crew).map((department, idx) => (
            <TabsContent key={department + idx} value={department}>
              <PersonCreditsTable
                key={department}
                department={department}
                credits={filterByDepartment(crew, department)}
              />
            </TabsContent>
          ))}

          <TabsContent value="images">
            <PosterList images={profiles} />
          </TabsContent>
        </Tabs>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
