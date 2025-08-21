import {Link, Navigate, useParams} from "react-router";
import {fetchAlbumTracks} from "../../query/fetchTracks.ts";
import {useQuery} from "@tanstack/react-query";
import {ChevronLeft, Loader} from "lucide-react";
import TrackCard from "@/components/TrackCard.tsx";
import {usePlayBack} from "@/hooks/usePlayBack.ts";


function ArtistAlbum() {
    const {albumID,artistID} = useParams()
    const {data, isPending, isError} = useQuery(fetchAlbumTracks(albumID ?? ""))
    const {PlayPlaylist}=usePlayBack()
    if (isPending) return <div className={"w-full animate-spin flex justify-center"}><Loader/></div>
    if (isError) return <Navigate to={"/"}/>

    return (
        <section className={"flex flex-col gap-3"}>
            <Link to={`/top-artist/${artistID}`}>
                <ChevronLeft strokeWidth={4} size={30}/>
            </Link>
            <div className={"gap-5 grid pb-50 grid-cols-6 w-full"}>
                {data?.tracks.items?.map((item: SpotifyApi.AlbumObjectSimplified, index: number) => {
                    return (
                        <TrackCard
                            item={item}
                            onMenuCLick={() => {
                            }}
                            onPlay={() => {
                                PlayPlaylist.mutate({
                                    contextUri: `spotify:album:${albumID}`,
                                    progress_ms: 0,
                                    offset: index
                                });
                            }}
                            albumImage={data?.images?.[0]?.url}
                            songName={item?.name}
                            key={index} artist={item?.artists[0].name}
                        />
                    )
                })}
            </div>


        </section>
    );
}

export default ArtistAlbum;