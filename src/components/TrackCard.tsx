import {EllipsisVertical, ListPlus, Loader, Music, PlusIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {useQuery} from "@tanstack/react-query";
import {fetchUserPlaylists} from "../../query/fetchPlaylist.ts";
import {ScrollArea} from "./ui/scroll-area.tsx";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {useAddQueueTrack} from "@/hooks/useAddQueueTrack.ts";
import {useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {useAddTrackToPlaylist} from "@/hooks/useAddTrackToPlaylist.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";


interface TrackCardProps<TData > {
    item: TData,
    onMenuCLick: () => void,
    onPlay: () => void,
    songName: string,
    artist: string
    albumImage: string
    isDisplayMenu?: boolean
}


function TrackCard<TData extends {uri :string}>({item, onPlay, songName, artist, albumImage, isDisplayMenu = true}: TrackCardProps<TData>) {
    const {data: playlistData} = useQuery(fetchUserPlaylists())
    const queue = useAddQueueTrack()
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>()
    const { mutate: addTracks,isPending } = useAddTrackToPlaylist();

    const AddToQueue = (uri: string) => {
        queue.mutate(uri)
    }

    const AddToPlaylist=()=>{
        console.log(item)
        addTracks({
            playlistId: selectedPlaylistId,
            uris: [item?.uri],
            onSuccess:()=>{
                setSelectedPlaylistId("")
            }
        });
    }

    return (
        <div className={"group select-none  relative overflow-hidden "}>
            <div onClick={onPlay}>
                <div
                    className={"overflow-hidden group-hover:border-2 border-[#0e6] rounded-md bg-[#292929] aspect-square "}>
                    <img src={albumImage} className={" transform transition-transform  hover:scale-130 mb-2  "}/>

                </div>
                <p className="truncate w-30 pt-2 text-[16px] PlusJakartaSans-SemiBold">{songName}</p>
                <p className={"truncate w-30 text-[14px] text-white/70 PlusJakartaSans-Regular"}>Song• {artist}</p>

            </div>

            <div className={"opacity-0 group-hover:opacity-100 absolute -bottom-0 -right-2"}>
                {isDisplayMenu &&
                    <DropdownMenu >
                        <DropdownMenuTrigger className={" "}> <EllipsisVertical/></DropdownMenuTrigger>
                        <DropdownMenuContent className={"min-w-80 overflow-hidden"}>
                            <DropdownMenuLabel className={"flex place-items-center w-full justify-between gap-3"}>
                               <div className={"flex gap-2"}>
                                   <div
                                       className={"w-12 overflow-hidden rounded-md  border-1 border-white h-12 bg-pink-100"}>
                                       <img src={albumImage} className={"flex-1 "}/>


                                   </div>

                                   <div>
                                       <p className="truncate w-30 pt-2 text-[13px] PlusJakartaSans-SemiBold">{songName}</p>
                                       <p className={"truncate w-30 text-[12px] text-white/70 PlusJakartaSans-Regular"}>Song• {artist}</p>

                                   </div>
                               </div>

                                <div>

                                    {selectedPlaylistId &&
                                        <button onClick={AddToPlaylist}>
                                        <Badge className={"bg-white "}>{isPending ? <Loader className={"animate-spin"}/> : <PlusIcon strokeWidth={4}/>}<p className="PlusJakartaSans-Bold">Add</p> </Badge>

                                    </button>}

                                        </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => AddToQueue(item?.uri)}
                                              className={"py-2 h-10 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 PlusJakartaSans-Bold"}><ListPlus
                                size={20} color={"white"}/> Add to Queue</DropdownMenuItem>
                            <div className={"p-3 "}>
                                <p className={"PlusJakartaSans-Bold text-[14px] pb-3"}>Add to Playlist</p>


                                <ScrollArea className="w-full h-[240px] pb-3 px-3 rounded-md ">
                                    <div className={"grid grid-cols-4 gap-2 "}>
                                        {playlistData?.items?.map((item: PlaylistBaseObject, index: number) => {
                                                return (
                                                    <div  key={index} onClick={()=>setSelectedPlaylistId(item?.id)}>
                                                        <div style={{ borderColor:item?.id === selectedPlaylistId ?"#0e6" : "transparent",
                                                            borderWidth:item?.id === selectedPlaylistId ?2 : 0,}}
                                                            className={"aspect-square flex  justify-center place-items-center overflow-hidden rounded-md bg-[#292929]"}>

                                                            <Avatar className="rounded-md w-20 h-full flex ">
                                                                <AvatarImage src={item?.images?.[0].url} />
                                                                <AvatarFallback className="rounded-md"><Music/></AvatarFallback>
                                                            </Avatar>
                                                        </div>

                                                        <p className={"PlusJakartaSans-Regular max-w-14 truncate  text-xs pt-2"}>{item?.name}</p>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>


                }
            </div>
        </div>
    );
}

export default TrackCard;