import { cn } from "@/utils/tailwind";
import React, { HTMLAttributes } from "react";

export function skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>){
    return(
        <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props}/>
    )
}