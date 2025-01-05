import { cn } from "@/utils/tailwind"
import { LucideIcon,    
    HomeIcon,
    PlayIcon,
    TvIcon,
    Search,
    LayoutGrid
} from "lucide-react"
import Link from "next/link"


export function SiteNav(){
    return (
        <div className="flex items-center gap-2">
            <NavItem title="OMDB" href="/" icon={HomeIcon}/>

            <NavItem title="Categories" href="/" icon={LayoutGrid}/>

            <NavItem title="Movies" href="/" icon={PlayIcon}/>
     
            <NavItem title="Series" href="/" icon={TvIcon}/>
               
            <NavItem title="Search" href="/" icon={Search}/>
            
        </div>
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
        <Link href={href} className={cn(isActive && "bg-accent", "gap-2")}>
            <Icon className="size-4" /> {title}
        </Link>
    )
}