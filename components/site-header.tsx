"use client";
import { cn } from "@/utils/tailwind";
import {
  LucideIcon,
  ClapperboardIcon,
  TvIcon,
  Search,
  LayoutGrid,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "./container";
import { useActiveNavItem } from "@/hooks/useActiveNavItem";

export function SiteHeader() {
  return (
    <header className="block md:absolute top-0 z-40 w-full">
      <Container>
        <div className="flex flex-col items-center sm:flex-row bg-transparent lg:gap-4">
          <Link
            href="/"
            className={cn(
              "self-start inline-flex cursor-pointer items-center px-1 text-2xl lg:text-3xl font-bold text-foreground py-2 mt-4 sm:my-8 sm:pr-8",
              "sm:hover:text-muted-foreground duration-300"
            )}
          >
            OMDB
          </Link>
          <div className="flex gap-2 lg:gap-4">
            <NavItem
              title="Home"
              href="/"
              icon={HomeIcon}
              className="inline-flex sm:hidden"
            />
            <NavItem title="Categories" href="/categories" icon={LayoutGrid} />
            <NavItem title="Movies" href="/movies" icon={ClapperboardIcon} />
            <NavItem title="Series" href="/series" icon={TvIcon} />
            <NavItem title="Search" href="/search" icon={Search} />
          </div>
        </div>
      </Container>
    </header>
  );
}

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  className?: string;
};

function NavItem({ title, href, icon, className }: NavItem) {
  const isActive = useActiveNavItem(href);
  const Icon = icon;
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex flex-col sm:flex-row cursor-pointer items-center px-1 sm:text-lg  font-semibold text-foreground my-4 sm:my-8",
        className && className
      )}
    >
      <Icon className="h-6 sm:h-4 lg:h-6 lg:mr-2 sm:group-hover:stroke-muted-foreground transition duration-300" />{" "}
      <span
        className={cn(
          isActive
            ? "border-foreground sm:border-b"
            : "sm:border-b sm:border-transparent sm:group-hover:border-muted-foreground sm:group-hover:text-muted-foreground duration-300 "
        )}
      >
        {title}
      </span>
    </Link>
  );
}
