"use client";

import { Search, XIcon } from "lucide-react";

import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { ComponentProps } from "react";

type SearchInputProps = ComponentProps<"input"> & {
  auto?: boolean;
};

export function SearchInput({
  auto = true,
  className,
  name = "q",
  type = "text",
  placeholder = "Search...",
}: SearchInputProps) {
  const { term, handleChange, handleKeyDown, clearSearch } = useSearch(auto);

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-4 size-5 text-muted-foreground" />
      <Input
        name={name}
        type={type}
        value={term}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn("px-10 md:text-xl h-14", className)}
        aria-label="Search"
        autoFocus={true}
      />
      {term && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0"
          onClick={clearSearch}
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
}
