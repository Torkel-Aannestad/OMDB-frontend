"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

export function useSearch(auto: boolean = true) {
  const router = useRouter();
  //   const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pageParam = searchParams.get("page");

  const [term, setTerm] = useState(query ?? "");
  const [page, setPage] = useState(pageParam ?? "");
  const [value] = useDebounce(term, 500);

  useEffect(() => {
    if (!query) {
      setTerm("");
    }
    if (!page) {
      setPage("");
    }
  }, [query, pageParam]);

  useEffect(() => {
    if (auto) {
      handleSearch(value, page);
    }
  }, [value, auto]);

  function handleSearch(value: string, page: string) {
    if (value !== "" && page !== "") {
      router.push(`/search?q=${value}&page=${page}`);
      console.log(`/search?q=${value}&page=${page}`);
      return;
    } else if (value !== "") {
      router.push(`/search?q=${value}`);
      console.log(`/search?q=${value}/`);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    setPage("");
    if (event.target.value === "") {
      clearSearch();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && query !== value && !auto) {
      handleSearch(value, page);
    }

    if (event.key === "Escape") {
      clearSearch();
    }
  }

  function clearSearch() {
    setTerm("");
    setPage("");
    router.push(`/search`);
  }

  return {
    term,
    handleChange,
    handleKeyDown,
    clearSearch,
  };
}
