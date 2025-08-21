import { useMutation } from '@tanstack/react-query';
import apiClient from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";


type AddTracksPayload = {
    playlistId: string | undefined;
    uris: string[];
    position?: number;
    onSuccess:()=>void
};


async function isTrackInPlaylist(playlistId: string, trackUri: string) {
    let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    while (nextUrl) {
        const res = await apiClient.get(nextUrl);
        
        const exists = res.data.items.some(
            (item: any) => item.track?.uri === trackUri
        );

        if (exists) return true;
        
        nextUrl = res.data.next;
    }

    return false;
}


const addTrackToPlaylist = async ({
                                       playlistId,
                                       uris,
                                       position,
                                      onSuccess,
                                   }: AddTracksPayload) => {


    if (!uris || !playlistId) {
      throw new Error("Something Went Wrong");
   }

    const trackExists = await isTrackInPlaylist(playlistId, uris[0]);


    if (trackExists) {
        onSuccess()

        return  toast.success('Tracks is Already in the playlist')


    }
    try {
        const response = await apiClient.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris,
                position,
            }
        );
        if (response.data){
            toast.success('Tracks added to playlist')
        }
    } catch (e) {
        throw e;
    }
};

export const useAddTrackToPlaylist = () => {


    return useMutation({
        mutationFn: addTrackToPlaylist,

        onError: () => {
            toast.error('Failed to add tracks to playlist')
        },
    });
};
