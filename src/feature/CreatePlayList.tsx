import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useCreatePlaylist} from "@/hooks/useCreatePlaylist.ts";
import {fetchCurrentSpotifyUser} from "../../query/fetchUser.ts";
import {useQuery} from "@tanstack/react-query";
import {Loader} from "lucide-react";




const playlistSchema = z.object({
    name: z.string().min(1, "Playlist name is required"),

});

type PlaylistForm = z.infer<typeof playlistSchema>;

export default function CreatePlaylist({onSuccess} :{onSuccess:()=>void}) {
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm<PlaylistForm>({
        resolver: zodResolver(playlistSchema),
    });
    const {mutate,isPending} = useCreatePlaylist();
    const { data: spotifyUser } = useQuery(fetchCurrentSpotifyUser());

    const HandleCreatePlaylist = (data: PlaylistForm) => {
       mutate({
            userId: spotifyUser?.data?.id,
            name: data.name,
            description:"",
            public: true,
        });


        reset();
        setTimeout(async ()=>{
             onSuccess()
        },200)
    };

    return (
        <div className="max-w-md mx-auto bg-[#121212] p-6 rounded-xl shadow-lg">
            {/* Title */}
            <h1 className="text-3xl text-center text-white font-bold mb-2">
                Create a Playlist
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-center text-white/80 mb-6">
                Give your playlist a name and an optional description to start adding
                your favorite tracks.
            </p>

            <form onSubmit={handleSubmit(HandleCreatePlaylist)} className="space-y-4">
                <div>
                    <label className="block text-[#dfdfdf] text-sm PlusJakartaSans-Regular  mb-2">
                        Name of the Playlist
                    </label>
                    <input
                        type="text"
                        placeholder="playlist"
                        {...register("name")}
                        className="w-full bg-[#1e1e1e] text-white px-3 py-2 rounded-md border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#1DB954] placeholder-[#aaa]"
                    />
                    {errors.name && (
                        <p className="text-[#df6d6d] pt-2 text-xs mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1DB954] flex  justify-center text-white font-bold text-base py-3 rounded-md mt-2 hover:bg-[#1ed760] transition"
                >

                    {isPending ? <Loader className={"animate-spin"}/> : "Create"}

                </button>
            </form>
        </div>
    );
}
