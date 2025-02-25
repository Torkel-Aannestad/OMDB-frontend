import { cn } from "@/utils/tailwind";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex h-[40vh] items-end justify-center">
      <div className="text-center">
        <h1 className="text-2xl">404</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
          <br />
          Please go back to the homepage.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-6")}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
