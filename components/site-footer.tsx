import Link from "next/link";
import { Container } from "./container";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-background">
      <Container className="flex flex-col lg:flex-row">
        <div className=" py-8 pt-12 text-muted-foreground md:p-12">
          <span className="font-bold text-3xl">OMDB</span>
          {/* <Icons.Shadcn className="size-8" /> */}
        </div>
        <div className="flex-1 pt-12 py-8 md:p-12">
          <div className="flex flex-col justify-between gap-12 xl:flex-row xl:items-center ">
            <div className="text-sm text-muted-foreground">
              <p>
                Built by{" "}
                <Link
                  href="torkelaannestad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  Torkel Aannestad
                </Link>{" "}
                with{" "}
                <Link
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  <Icons.Next className="inline size-3 fill-current align-middle" />{" "}
                  Next.js
                </Link>{" "}
                and{" "}
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  <Icons.Shadcn className="inline size-3 fill-current align-middle" />{" "}
                  shadcn/ui
                </Link>
                .
              </p>
              <p></p>

              <p className="mt-8">
                Data provided by{" "}
                <Link
                  href="https://developer.themoviedb.org/docs/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground"
                >
                  TMDB
                </Link>
                .
              </p>
            </div>

            <div className="hidden gap-2 md:flex">
              <Link
                href="https://github.com/Torkel-Aannestad/omdb-frontend"
                className={buttonVariants({ variant: "outline" })}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icons.Github className="inline size-4 fill-current align-middle md:mr-2" />
                <span className="sr-only md:not-sr-only">Source code</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
