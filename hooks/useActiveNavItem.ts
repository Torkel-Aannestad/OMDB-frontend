"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useActiveNavItem(href: string) {
  const pathname = usePathname();
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export function useActiveSearchQuery(
  searchQueryVar: string,
  searchQueryValue: string
) {
  const searchParams = useSearchParams();

  const value = searchParams.get(searchQueryVar);
  if (value === null) {
    return false;
  }

  if (value === searchQueryValue) {
    return true;
  }
  return false;
}
