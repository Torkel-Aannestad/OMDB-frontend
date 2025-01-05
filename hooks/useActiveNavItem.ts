"use client";

import { usePathname } from "next/navigation";

export function useActiveNavItem(href: string) {
  const pathname = usePathname();
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}
