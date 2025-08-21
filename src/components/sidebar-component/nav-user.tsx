
import {
  AlertCircle,
  ChevronsUpDown,
  LogOut,
 Verified,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar.tsx"
import {useAuth} from "@/context/AuthProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchCurrentSpotifyUser} from "../../../query/fetchUser.ts";

export function NavUser({
                            user,
                        }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const {isMobile} = useSidebar()
    const {logout, currentUser} = useAuth()
  const {data} = useQuery(fetchCurrentSpotifyUser());

  return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={data?.data?.images[0]?.url} alt={user.name}/>
                                <AvatarFallback className="rounded-lg">{currentUser?.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-medium">{currentUser?.userName}</span>
                              <span className="truncate text-xs">{currentUser?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                  <AvatarImage src={data?.data?.images[0]?.url} alt={user.name}/>

                                  <AvatarFallback className="rounded-lg">{currentUser?.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{currentUser?.userName}</span>
                                    <span className="truncate text-xs">{currentUser?.email}</span>
                                       </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                          {currentUser?.emailConfirmed ? (
                              <div className="flex items-center py-1.5 rounded-md px-2 gap-2 text-[#0e6]/80 border border-[#0e6] bg-[#0e6]/10">
                                <Verified color="#0e6" /> Verified
                              </div>
                          ) : (
                              <div className="flex items-center py-1.5 rounded-md px-2 gap-2 text-red-600/80 border border-red-600 bg-red-600/10">
                                <AlertCircle color="red" /> Unverified
                              </div>
                          )}

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>

                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant={"destructive"} onClick={logout}>
                            <LogOut/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
