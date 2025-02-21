import { User } from "lucide-react";

import { cn } from "@/utils/tailwind";

import { Badge, BadgeProps } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type MediaRatingProps = BadgeProps & {
  average: number;
  count?: number;
};

export function MediaRating({
  average,
  count,
  className,
  ...props
}: MediaRatingProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className={cn("flex items-center gap-1", className)}
            {...props}
          >
            {average ? `${(average * 10).toFixed(0)}% user rating` : "N/A"}
          </Badge>
        </TooltipTrigger>

        {count && (
          <TooltipContent className="flex items-center gap-1 bg-foreground text-xs text-background">
            <User className="size-3" /> {count}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
