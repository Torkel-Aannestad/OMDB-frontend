"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  RawCombinedCredit,
  RawMovieCredit,
  RawSerieCredit,
} from "@/tmdb/models";
import { format } from "@/tmdb/utils";
import { Clapperboard, Tv } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pluralize } from "@/utils/people";

interface PersonCreditsTableProps {
  credits: RawCombinedCredit[];
  department: string;
}

export function PersonCreditsTable({
  credits,
  department,
}: PersonCreditsTableProps) {
  const [filterValue, setFilterValue] = useState<string>("all");

  const sort = (a: RawCombinedCredit, b: RawCombinedCredit) => {
    const aDate = new Date(
      a.media_type === "movie" ? a.release_date : a.first_air_date
    );
    const bDate = new Date(
      b.media_type === "movie" ? b.release_date : b.first_air_date
    );
    return bDate.getTime() - aDate.getTime();
  };

  const filter = (credit: RawCombinedCredit) => {
    return filterValue === "all" || credit.media_type === filterValue;
  };

  const sortedList = useMemo(() => credits.sort(sort), [credits]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{department}</h2>

        <div className="flex items-center gap-4">
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="max-h-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-24">Year</TableHead>
            <TableHead className="w-full">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedList
            .filter(filter)
            ?.map((credit) =>
              credit.media_type === "movie" ? (
                <CreditsTableMovieItem key={credit.credit_id} {...credit} />
              ) : (
                <CreditsTableSerieItem key={credit.credit_id} {...credit} />
              )
            )}
        </TableBody>
      </Table>
    </div>
  );
}

function CreditsTableMovieItem({
  id,
  release_date,
  title,
  character,
  job,
}: RawMovieCredit) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Clapperboard className="inline-block size-4" />
      </TableCell>
      <TableCell>{release_date ? format.year(release_date) : "-"}</TableCell>
      <TableCell>
        <Link className="font-medium" href={`/movies/${id}`}>
          {title}
        </Link>
        {(character || job) && (
          <p className="text-muted-foreground">as {character || job}</p>
        )}
      </TableCell>
    </TableRow>
  );
}

function CreditsTableSerieItem({
  id,
  first_air_date,
  name,
  episode_count,
  character,
  job,
}: RawSerieCredit) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Tv className="inline-block size-4" />
      </TableCell>
      <TableCell>
        {first_air_date ? format.year(first_air_date) : "-"}
      </TableCell>
      <TableCell>
        <Link className="font-medium" href={`/series/${id}`}>
          {name}
        </Link>
        <p className="text-muted-foreground">
          {episode_count > 0 && (
            <span>
              {episode_count} {pluralize(episode_count, "episode", "episodes")}
            </span>
          )}
          {(character || job) && ` as ${character || job}`}
        </p>
      </TableCell>
    </TableRow>
  );
}
