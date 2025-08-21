import {Award, Clock} from "lucide-react";

import {Card} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"
import {TopArtistsQuery} from "../../query/fetchArtists.ts";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router";
import RecentlyPlayed from "@/feature/RecentlyPlayed.tsx";


function Home() {

    const {data} = useQuery(TopArtistsQuery());
    console.log(data)
    return (
        <section className="flex flex-col gap-5 ">

            <div>

                <div className={"select-none flex gap-2 place-items-center"}>
                    <div className="p-2 bg-[#00311D] rounded-md"><Award color={"#85e0ba"}/></div>
                    <h1 className="PlusJakartaSans-Bold text-lg lg:text-2xl">My top Artists</h1>
                </div>

            </div>
            <Carousel className="w-full ">
                <CarouselContent className="-ml-1">
                    {data?.items?.map((item:SpotifyApi.ArtistObjectFull, index: number) => (
                        <CarouselItem key={index} className="pl-1 basis-4/6 md:basis-2 lg:basis-1/4">
                            <div className="p-1">
                                <Card className={"group select-none py-0 rounded-lg overflow-hidden"}>

                                    <Link to={`top-artist/${item?.id}`}>
                                        <div
                                            className="h-full z-1  flex-1 relative  aspect-square items-center justify-center ">
                                            <img alt={""} className={"-z-1   object-cover transform transition-transform  group-hover:scale-110"}
                                                 src={item?.images?.[0]?.url}/>


                                            <div className={"select-none absolute left-4 w-full  bottom-4 z-1"}>
                                                <h1 className="text-xl PlusJakartaSans-Bold">{item?.name}</h1>


                                                <div className="flex place-items-center justify-between w-full">
                                                    <div className={"w-full"}>
                                                        <h1 className="text-lg PlusJakartaSans-Bold">4.3M</h1>
                                                        <p className="PlusJakartaSans-Regular ">followers</p>
                                                    </div>
                                                    <div className={"w-full"}>
                                                        <h1 className="text-lg PlusJakartaSans-Bold">67</h1>
                                                        <p className="PlusJakartaSans-Regular ">Popularity</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

                                        </div>

                                    </Link>

                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
            <div>

                <div className={" select-none flex gap-2 place-items-center"}>
                    <div className="p-2 bg-[#00311D] rounded-md"><Clock color={"#85e0ba"}/></div>
                    <h1 className="PlusJakartaSans-Bold text-lg lg:text-2xl">Recently Played</h1>
                </div>
                <RecentlyPlayed/>
            </div>
        </section>
    );
}

export default Home;