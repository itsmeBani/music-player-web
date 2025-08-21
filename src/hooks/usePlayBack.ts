
import {QueryClient, useMutation} from "@tanstack/react-query";
import apiClient from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";
type PlaySpotifyTrackInput = {
    contextUri: string | undefined;
    progress_ms: number;
};
type PlaySpotifyPlaylistInput = {
    contextUri: string | undefined;
    progress_ms: number;
    offset?:number
};
export const usePlayBack=()=>{
    const Play = useMutation<void, Error, PlaySpotifyTrackInput>({
        mutationFn: async ({contextUri, progress_ms}) => {
            if (!contextUri) return
            await apiClient.put(
                `https://api.spotify.com/v1/me/player/play`,
                {
                    uris: [contextUri],
                    position_ms: progress_ms,
                }
            );
        },
        onSuccess: () => console.log("succ"),
        onError: (err) => {
            console.log('Error playing track:', err)
        },
    });

    const queryClient=new QueryClient()

    const PlayPlaylist = useMutation<void, Error, PlaySpotifyPlaylistInput>({
        mutationFn: async ({contextUri, progress_ms,offset=0}) => {

            await apiClient.put(
                `https://api.spotify.com/v1/me/player/play`,
                {
                    context_uri: contextUri,
                    offset:{
                        position:offset
                    },
                    progress_ms:progress_ms
                }
            );
        },
        onMutate: async () => await queryClient.cancelQueries({queryKey: ["current-track"]}),
        onError: (err) => {
        toast.error(err.message)
        },
    });

return {Play,PlayPlaylist}
}

