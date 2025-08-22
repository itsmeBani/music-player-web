import {Link, Navigate, useParams} from "react-router";
import {fetchCurrentArtist} from "../../query/fetchArtists.ts";
import {fetchAllTrackByArtist, fetchArtistTopTracks} from "../../query/fetchTracks.ts";
import {useQueries} from "@tanstack/react-query";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,

    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import TrackCard from "@/components/TrackCard.tsx";
import {usePlayBack} from "@/hooks/usePlayBack.ts";
import {ChevronLeft, ListMusicIcon, Loader, PlayIcon} from "lucide-react";
import {Waves} from "@/components/ui/waves.tsx";
import AlbumCard from "@/components/AlbumCard.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


export default function TopArtist() {
    const {artistID} = useParams();
    const {Play} = usePlayBack()

    const response = useQueries({
        queries: [
            fetchCurrentArtist(artistID ?? ""),
            fetchAllTrackByArtist(artistID ?? ""),
            fetchArtistTopTracks(artistID ?? "")
        ]
    })

    function formatFollowers(followersCount: number) {
        if (followersCount >= 1000000) {
            return (followersCount / 1000000).toFixed(1) + 'M';
        } else if (followersCount >= 1000) {
            return (followersCount / 1000).toFixed(1) + 'k';
        } else {
            return followersCount.toString();
        }
    }

    const [currentArtist, album, topTracks] = response

    if (currentArtist.isError) return <Navigate to="/"/>

    if (currentArtist.isPending || album.isPending || topTracks.isPending) return <div
        className={"w-full animate-spin flex justify-center"}><Loader/></div>


    return (
        <section className={"pb-100 pt-2  "}>
            <div className={"pb-4"}>
                <Link to={`/`}>
                    <ChevronLeft strokeWidth={4} size={30}/>
                </Link>

            </div>
            <div className={"flex gap-4 lg:flex-row place-items-start flex-col"}>
                <div className="flex flex-row lg:flex-col lg:gap-0 gap-3 lg:aspect-square lg:w-300">
                    <img className={"aspect-square w-35 lg:w-auto rounded-lg object-cover "}
                         src={currentArtist?.data?.images?.[0].url} alt={""}/>

                    <div className="flex flex-col  gap-2  ">
                        <h1 className="font-extrabold text-lg lg:text-2xl pt-5">{currentArtist?.data?.name}</h1>
                     <div className="flex flex-row lg:gap-10 gap-4">
                         <div>

                             <h1 className="PlusJakartaSans-Bold text-sm lg:text-xl"> {formatFollowers(currentArtist?.data?.followers?.total)}</h1>
                             <p className="PlusJakartaSans-Regular leading-5 text-xs lg:text-lg">followers</p>
                         </div>
                         <div>
                             <h1 className="PlusJakartaSans-Bold text-sm lg:text-xl"> {currentArtist?.data?.popularity.toLocaleString()}</h1>
                             <p className="PlusJakartaSans-Regular leading-5 text-xs lg:text-lg">Popularity</p>
                         </div>
                     </div>
                    </div>
                </div>
                <div className="flex flex-col lg:h-full">
                    <div className="relative   lg:w-130 lg:min-h-[200px] bg-white rounded-lg overflow-hidden border">
                        <div className="absolute inset-0 ">
                            <Waves
                                lineColor="white"
                                backgroundColor="#1E40AF"
                                waveSpeedX={0.02}
                                waveSpeedY={0.01}
                                waveAmpX={40}
                                waveAmpY={20}
                                friction={0.9}
                                tension={0.01}
                                maxCursorMove={120}
                                xGap={20}
                                yGap={36}
                            />
                        </div>
                        <div className="relative overflow-hidden z-10 p-8 flex justify-between  w-full">

                            <div>
                                <h2 className="text-2xl font-extrabold ">Top Tracks</h2>
                                <p className="text-md text-white/80 mt-1">
                                    Discover the most popular and trending songs by this artist
                                </p>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <Drawer direction={"right"}>
                                    <DrawerTrigger><PlayIcon size={50} fill={"#212121"}
                                                             className={"bg-white rounded-full cursor-pointer p-2"}/></DrawerTrigger>
                                    <DrawerContent className={"lg:min-w-xl min-w-l  overflow-auto"}>
                                        <DrawerHeader className={"pb-0"}>
                                            <DrawerTitle>Top Tracks</DrawerTitle>
                                            <DrawerDescription>The most popular and trending songs by this
                                                artist</DrawerDescription>
                                        </DrawerHeader>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-5 pb-100 ">
                                            {topTracks?.data?.tracks.map((item: SpotifyApi.TrackObjectFull, index: number) => {
                                                return (
                                                    <TrackCard key={index}
                                                               item={item} isDisplayMenu={false}
                                                               onMenuCLick={() => {
                                                               }}
                                                               onPlay={() => {
                                                                   Play.mutate({
                                                                       contextUri: item?.uri,
                                                                       progress_ms: 0,

                                                                   });
                                                               }}
                                                               artist={item?.artists?.[0]?.name}
                                                               songName={item?.name}
                                                               albumImage={item?.album?.images?.[0]?.url}
                                                    />
                                                )
                                            })}
                                        </div>

                                    </DrawerContent>
                                </Drawer>
                            </div>
                        </div>
                    </div>

                    <ScrollArea className={""}>
                        <div className={"flex justify-between w-full  py-4 "}>
                            <div className={" select-none flex gap-2 place-items-center"}>
                                <div className="p-2 bg-[#00311D] rounded-md"><ListMusicIcon color={"#85e0ba"}/></div>
                                <h1 className="PlusJakartaSans-Bold text-lg lg:text-2xl">Albums</h1>
                            </div>

                        </div>
                        <div className={"grid grid-cols-2 lg:grid-cols-4 gap-3"}>
                            {album?.data?.items?.map((item: SpotifyApi.AlbumObjectSimplified, index: number) => {

                                return (
                                    <AlbumCard item={item} key={index}/>


                                )
                            })}
                        </div>
                    </ScrollArea>
                </div>
            </div>


        </section>
    );
}

