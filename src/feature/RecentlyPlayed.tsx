import {fetchRecentlyPlayedTrack} from "../../query/fetchTracks.ts";
import {useQuery} from "@tanstack/react-query";
import TrackCard from "@/components/TrackCard.tsx";
import {Carousel, CarouselContent} from "@/components/ui/carousel.tsx";
import {usePlayBack} from "@/hooks/usePlayBack.ts";


function RecentlyPlayed() {
    const {data} = useQuery(fetchRecentlyPlayedTrack())
    const {Play}=usePlayBack()

    return (
        <div className={"py-5"}>
            <Carousel className="w-full ">
                <CarouselContent className="ml-1 flex gap-4">
                    {data?.items?.map((item: {track :SpotifyApi.TrackObjectFull,uri:string}, index: number) => {


                        return (
                            <TrackCard key={index}
                                       onPlay={() =>
                                           Play.mutate({
                                           contextUri: item?.track.uri,
                                           progress_ms: 0,

                                       })}
                                       songName={item?.track.name}
                                       artist={item?.track.artists?.[0].name}
                                       albumImage={item?.track.album?.images?.[0].url} isDisplayMenu={false}
                                       onMenuCLick={() => {
                                       }} item={item}/>
                        )
                    })}
                </CarouselContent>

            </Carousel>


        </div>
    );
}

export default RecentlyPlayed;