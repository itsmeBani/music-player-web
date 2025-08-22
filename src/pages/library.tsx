import {useQuery} from "@tanstack/react-query";
import {fetchUserPlaylists} from "../../query/fetchPlaylist.ts";
import PlaylistCard from "@/components/PlaylistCard.tsx";
import PlaylistBaseObject = SpotifyApi.PlaylistObjectFull;

import {ListMusicIcon, PlusIcon, Trash, TriangleAlert} from "lucide-react";
import {
    Drawer, DrawerClose,
    DrawerContent, DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import CreatePlaylist from "@/feature/CreatePlayList.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useRef} from "react";
import {
    ContextMenu,
    ContextMenuContent, ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu.tsx";
import {useRemovePlaylist} from "@/hooks/useDeletePlaylist.ts";


function Library() {
    const {data,refetch} = useQuery(fetchUserPlaylists())
    const closeRef = useRef<HTMLButtonElement>(null)

    const removePlaylist = useRemovePlaylist();


    const HandleRemovePlaylist=(playlistID:string)=>{
        removePlaylist.mutate({
            playlistId: playlistID,
            onSuccessRemove:onSuccess
        });
    }
    const onSuccess=async ()=>{
       await refetch()
        closeRef.current?.click()
    }
    return (
        <section>
            <div className={"flex justify-between w-full  py-4 "}>
                <div className={" select-none flex gap-2 place-items-center"}>
                    <div className="p-2 bg-[#00311D] rounded-md"><ListMusicIcon color={"#85e0ba"}/></div>
                    <h1 className="PlusJakartaSans-Bold lg:text-2xl">My Library</h1>
                </div>


                <Drawer   direction={"right"} >
                    <DrawerTrigger>
                        <div className={"bg-white lg:py-2 px-2  pr-3 py-1 PlusJakartaSans-Bold text-[#191919] lg:px-5 rounded-full text-xs lg:text-sm flex place-items-center"}><PlusIcon strokeWidth={2.5} className={"mr-1"}/>Create Playlist</div>
                    </DrawerTrigger>
                    <DrawerContent className={"bg-[#121212] w-[60px] lg:w-[100px]  flex h-full pt-10"}>
                         <CreatePlaylist onSuccess={onSuccess}/>

                        <DrawerFooter>
                            <DrawerClose>
                                <Button ref={closeRef} className={"w-full"}  variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                       </DrawerContent>


                </Drawer>

                 </div>
           <div className={"grid grid-cols-2 lg:grid-cols-6 gap-2 w-full pb-100 "}>
               {data?.items?.map((item :PlaylistBaseObject,index:number)=>{
                   return (
                   <ContextMenu>
                       <ContextMenuTrigger>

                           <PlaylistCard key={index} item={item}/>
                       </ContextMenuTrigger>
                       <ContextMenuContent>

                           <ContextMenuLabel className="max-w-[260px] text-xs leading-snug text-muted-foreground">
                               <TriangleAlert className="my-2"/>
                               Deleting this playlist will permanently remove it from your library and also delete it on your Spotify account.
                               This action cannot be undone.
                           </ContextMenuLabel>
                           <ContextMenuSeparator />
                           <ContextMenuItem onClick={()=>HandleRemovePlaylist(item?.id)}
                               className="text-red-500 PlusJakartaSans-Regular focus:text-red-600 focus:bg-red-600/10"
                           >
                               <Trash className="text-red-500 "/>

                               Delete playlist

                           </ContextMenuItem>
                       </ContextMenuContent>
                   </ContextMenu>
                   )
               })}
           </div>


        </section>
    );
}

export default Library;