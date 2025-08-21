import * as React from "react"
import {
  AudioWaveform,
  Command,

  GalleryVerticalEnd, HomeIcon, Library, PlayIcon,
} from "lucide-react"

import { NavMain } from "@/components/sidebar-component/nav-main.tsx"

import { NavUser } from "@/components/sidebar-component/nav-user.tsx"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,

  SidebarRail,
} from "@/components/ui/sidebar.tsx"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mobile",
      logo: GalleryVerticalEnd,
      plan: "Device",
    },
    {
      name: "Laptop",
      logo: AudioWaveform,
      plan: "Device",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isActive: true,
      items: [

      ],
    },
    {
      title: "Play",
      url: "play",
      icon: PlayIcon,
      items: [
      ],
    },
    {
      title: "Library",
      url: "library",
      icon: Library,
      items: [
      ],
    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
