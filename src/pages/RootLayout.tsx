import {Outlet} from "react-router";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar-component/app-sidebar.tsx";

import Devices from "@/feature/Devices.tsx";
import MusicPlayer from "@/feature/musicPlayer.tsx";
import logo from "../assets/LOGOAPP.png"


export const RootLayout = () => {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset className={"flex h-[100dvh] overflow-hidden"}>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center mr-2 justify-between w-full gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <h1 className={"flex lg:hidden gap-2 place-items-center PlusJakartaSans-Bold"}><img className="h-5"
                                                                                                  src={logo}/>Music
                            Player</h1>


                        <Devices/>


                    </div>
                </header>
                <div className="flex overflow-auto   flex-col gap-4 p-4 pt-0">
                    <Outlet/>

                    <MusicPlayer/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}


export const LibraryLayout = () => {

    return (
        <section><Outlet/></section>
    )
}