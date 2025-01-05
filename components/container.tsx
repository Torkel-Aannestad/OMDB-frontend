import { cn } from "@/utils/tailwind";

interface ContainerProps{
    children: React.ReactNode,
    className?: string
}
  
export function Container({children, className}:ContainerProps){
    return (
        <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", className && className)}>
            {children}
        </div>
    )
}