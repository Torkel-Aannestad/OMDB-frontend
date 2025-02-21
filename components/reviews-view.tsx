import { cn } from "@/utils/tailwind";
import { ComponentProps } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UserAvatar } from "./user-avatar";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import type { Review } from "@/tmdb/models";
import { Badge } from "./ui/badge";
import { format } from "@/tmdb/utils";
import { Divide, ReceiptPoundSterling } from "lucide-react";
import { EmptyStateCard } from "./empty-state-card";

type ReviewListProps = ComponentProps<"div"> & {
  title?: string;
  reviews: Review[];
  numberOfReviews?: number;
};

function List({ title = "Reviews", reviews, className }: ReviewListProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="md:mb-12 md:mt-6">
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>

      {reviews ? (
        <div className="grid grid-cols-[1fr, max-w-80]">
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
          </div>
          <div className="60px"></div>
        </div>
      ) : (
        <EmptyStateCard text="Currently no reviews" />
      )}
    </div>
  );
}

type SingleReviewProps = ComponentProps<"div"> & {
  title: string;
  link?: string;
  linkTitle?: string;
  review: Review;
  numberOfReviews: number;
};

function Single({
  title,
  link,
  linkTitle = "See all reviews",
  review,
  numberOfReviews,
  className,
}: SingleReviewProps) {
  return (
    <div className={cn("", className)}>
      <div className="mb-4 flex items-center justify-between gap-4 ">
        <h2 className="font-medium md:text-lg">
          {title}{" "}
          <span className="text-muted-foreground">({numberOfReviews})</span>
        </h2>
        {link && review && (
          <Link
            href={link}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "text-xs"
            )}
          >
            {linkTitle}
          </Link>
        )}
      </div>
      {review ? (
        <ReviewCard review={review} />
      ) : (
        <EmptyStateCard text="Currently no reviews" />
      )}
    </div>
  );
}

type ReviewCardProps = ComponentProps<"div"> & { review: Review };

function ReviewCard({ review, className, ...props }: ReviewCardProps) {
  const { author_details, created_at, content } = review;
  const { name, avatar_path, rating, username } = author_details;
  const createdDate = format.date(created_at);

  const user = name !== "" ? name : username;

  return (
    <Card className="border" key={review.id + review.url}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserAvatar image={avatar_path} username={user} alt={user} />
          <div className="flex flex-col gap-2">
            <CardTitle>{user}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {rating && (
                <Badge
                  className="hover:bg-secondary"
                  variant={"secondary"}
                >{`Rating ${rating * 10}%`}</Badge>
              )}
              <p>{createdDate}</p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="whitespace-pre-line text-secondary-foreground ">
        {content}
      </CardContent>
    </Card>
  );
}

export const ReviewsView = {
  Single,
  List,
};
