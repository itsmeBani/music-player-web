import {ChevronRight, type LucideIcon, Users} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx"
import {
    SidebarGroup,

    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.tsx"
import {Link} from "react-router";
import logo from "@/assets/LOGOAPP.png";
import {useAuth} from "@/context/AuthProvider.tsx";

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {


    const {currentUser} = useAuth()
    return (
        <SidebarGroup>
            <div className="rounded-md flex gap-4 place-items-center p-2 pb-4">
                <img alt="" className="h-10"
                     src={logo}/>
            <h1 className={"font-extrabold"}>Music Player</h1>
            </div>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>

                                <Link to={item?.url}>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon strokeWidth={2}/>}
                                        <span>{item.title}</span>
                                        {item?.items && (
                                            item?.items?.length > 0 &&
                                            <ChevronRight
                                                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                        )
                                        }
                                    </SidebarMenuButton>
                                </Link>

                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}


                {currentUser?.roles[0].toLowerCase() === "user"
                    &&
                    <SidebarMenuItem>
                        <Link to={"/users"}>
                            <SidebarMenuButton tooltip={"user s"}>
                                <Users/>
                                <span>Users</span>

                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                }
            </SidebarMenu>
        </SidebarGroup>
    )
}
