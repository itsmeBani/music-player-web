import {useState} from "react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useQuery} from "@tanstack/react-query";
import {SearchTracks} from "../../query/fetchTracks.ts";
import TrackCard from "@/components/TrackCard.tsx";

import {Input} from "@/components/ui/input.tsx";
import {Loader, Search} from "lucide-react";
import {usePlayBack} from "@/hooks/usePlayBack.ts";

function Play() {

    const [searchTrack, setSearchTrack] = useState("Arthur Nery")
    const {Play}=usePlayBack()
    const debouncedSearchTerm = useDebounce(searchTrack, 600);
    const {data ,isPending} = useQuery(SearchTracks(debouncedSearchTerm))

    return (
        <section className=" w-full flex flex-col gap-4 lg:gap-10 pt-2 h-full ">
            <div className={"  flex place-items-center justify-center "}>

            <div className={"flex border-[0.3px] w-full lg:min-w-130 px-2 rounded-md max-w-130  border-white place-items-center"}>
                <Search/>
                <Input onChange={(e)=>setSearchTrack(e.target.value)}  placeholder={"What do you want to listen to?"}
                        className={"PlusJakartaSans-Regular border-none w-full  focus-visible:focus-visible:ring-transparent border-white  border-[0.2px]"}/>

            </div>
                 </div>
            {isPending && <div className={"w-full flex justify-center"}><Loader className={"animate-spin"}/></div>}
            <div className={"gap-2 lg:gap-5 grid pb-50 grid-cols-1 lg:grid-cols-6 w-full"}>
                {data?.tracks?.items.map((item: SpotifyApi.TrackObjectFull) => {
                        return (
                            <TrackCard  item={item}
                                       onMenuCLick={() => {
                                       }}
                                       onPlay={() => {

                                         Play.mutate({
                                               contextUri: item?.uri,
                                               progress_ms: 0,

                                           });
                                       }}
                                       songName={item?.name}
                                       artist={item?.artists?.[0]?.name}
                                       albumImage={item?.album?.images?.[0]?.url}/>
                        )
                    }
                )
                }
            </div>

        </section>
    );
}

export default Play;