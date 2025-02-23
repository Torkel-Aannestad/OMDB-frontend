import { Serie, Movie } from "@/tmdb/models";
import { RawCombinedCredit } from "@/tmdb/models/combined-credits";

export function getDepartments(list: RawCombinedCredit[]) {
  const departments = new Set(list.map((item) => item.department));
  return Array.from(departments);
}

export function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

export function filterByDepartment(
  list: RawCombinedCredit[],
  department: string
) {
  return list.filter((item) => item.department === department);
}

export function getPersonHighlights(
  {
    cast,
    crew,
    department,
  }: {
    cast: RawCombinedCredit[];
    crew: RawCombinedCredit[];
    department: string;
  },
  count = 8
) {
  const isActing = department === "Acting";

  function isHighQuality(item: RawCombinedCredit) {
    if (item.vote_count <= 0) return false;
    if (item.media_type !== "movie") return item.episode_count > 8;
    return item.order < 10;
  }

  const list = isActing
    ? sortByVoteScore(cast.filter(isHighQuality))
    : sortByVoteScore(crew);

  const highlightedItems = getUniqueItems(list).slice(0, count);

  const heroBackdrop = highlightedItems.filter((item) => item.backdrop_path)[0]
    .backdrop_path;

  return {
    highlightedItems,
    heroBackdrop,
  };
}

function sortByVoteScore(items: Movie[] | Serie[] | RawCombinedCredit[]) {
  return items.sort((a, b) => {
    const aScore = a.vote_average * (a.vote_count / 1000);
    const bScore = b.vote_average * (b.vote_count / 1000);
    return bScore - aScore;
  });
}

export function getUniqueItems(list: any[]) {
  const unique = new Map(list.map((item) => [item.id, item]));
  return Array.from(unique.values());
}
