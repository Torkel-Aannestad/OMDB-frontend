import { cn } from "@/utils/tailwind"
import { LucideIcon,    
    HomeIcon,
    PlayIcon,
    TvIcon,
    Search,
    LayoutGrid
} from "lucide-react"
import Link from "next/link"
import { Container } from "./container"

export function SiteHeader(){
    return (
        <header>
            <Container>
                <div className="flex bg-background">
                    <div className="inline-flex cursor-pointer items-center px-1 text-xl font-bold text-neutral-800 my-8 sm:mr-8">OMDB</div>
                    <NavItem title="Categories" href="/" icon={LayoutGrid}/>
                    <NavItem title="Movies" href="/" icon={PlayIcon}/>
                    <NavItem title="Series" href="/" icon={TvIcon}/>
                </div>
            </Container>
        </header>
    )
}


type NavItem = {
    title: string,
    href: string,
    icon: LucideIcon
}

function NavItem({title, href, icon}: NavItem){
    const isActive = true
    const Icon = icon
    return (
        <Link href={href} 
            className=
                "inline-flex cursor-pointer items-center px-1 text-lg font-semibold text-neutral-800 my-8"
            >
           <Icon className="h-4"/> <span className={cn(
                isActive ? "border-neutral-800 border-b" : "border-transparent hover:border-neutral-600 hover:text-neutral-800  "
            )}>{title}</span>
                
        </Link>
    )
}