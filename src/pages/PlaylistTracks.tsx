import  {useState} from 'react';
import {Link, Navigate, useParams} from "react-router";
import {useQueries} from "@tanstack/react-query";
import {fetchCoverPlaylistImage, fetchPlayListTrack} from "../../query/fetchPlaylist.ts";
import TrackCard from "@/components/TrackCard.tsx";
import {ChevronLeft, Loader, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {usePlayBack} from "@/hooks/usePlayBack.ts";

function PlaylistTracks() {
    const { PlaylistID } = useParams();

    const [search,setSearch]=useState("")
   const {PlayPlaylist}=usePlayBack()
    const results= useQueries({
        queries: [
            fetchPlayListTrack(PlaylistID ?? ""),
            fetchCoverPlaylistImage(PlaylistID ?? "")
        ]
    });
    const [playlistTrack] = results;
    const filteredTracks = playlistTrack?.data?.items?.filter((item: { track: SpotifyApi.TrackObjectFull }) =>
        item?.track?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );
    if (!PlaylistID) return  <Navigate to={"/library"} replace={true}/>

    return (
        <section className={"flex flex-col gap-3 lg:gap-6"}>
            <Link to={"/library"}>
                <ChevronLeft strokeWidth={4} size={30}/>
            </Link>
            <div className={"  pb-2 flex place-items-center justify-center "}>

                <div className={"flex border-[0.3px] w-full lg:min-w-130 px-2 rounded-md max-w-130  border-white place-items-center"}>
                    <Search/>
                    <Input onChange={(e)=>setSearch(e.target.value)}  placeholder={"What do you want to listen to?"}
                           className={"PlusJakartaSans-Regular border-none w-full  focus-visible:focus-visible:ring-transparent border-white  border-[0.2px]"}/>

                </div>
            </div>

            {playlistTrack?.isPending && <div className={"w-full flex justify-center"}><Loader className={"animate-spin"}/></div>}
           <div className={"grid grid-cols-2 lg:grid-cols-6 pb-100  gap-2 lg:gap-4"}>
               {filteredTracks?.map((item: {track :SpotifyApi.TrackObjectFull, uri : string},index:number)=>{
                   return <TrackCard key={index}



                                     onPlay={() => {
                                         PlayPlaylist.mutate({
                                             contextUri: `spotify:playlist:${PlaylistID}`,
                                             progress_ms: 0,
                                             offset: index
                                         });
                                     }}
                                     onMenuCLick={() => { }}
                                     albumImage={item?.track?.album?.images?.[0]?.url ?? ""}
                                     songName={item?.track?.name ?? ""}
                                     artist={item?.track?.artists?.[0]?.name ?? ""}
                                     item={item}
                   />
               })}
           </div>





        </section>
    );
}

export default PlaylistTracks;