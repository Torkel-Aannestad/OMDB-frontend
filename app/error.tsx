"use client";

import { cn } from "@/utils/tailwind";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="container flex h-[40vh] items-end justify-center">
      <div className="text-center">
        <h1 className="text-2xl">Something went wrong</h1>
        <p className="text-muted-foreground">
          Something went wrong while trying to load the page.
          <br />
          Please go back to the homepage.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-6")}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
