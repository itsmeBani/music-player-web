
import { useMutation} from '@tanstack/react-query';

import apiClient from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";


type DeleteTrackPayload = {
    playlistId: string;
    uri: string;
    snapshotId?: string;
    onSuccess:()=>void
};

const deleteTrackFromPlaylist = async ({
                                           playlistId,
                                           uri,
                                           snapshotId,
                                           onSuccess
                                       }: DeleteTrackPayload) => {




    if (!playlistId || !uri){
        throw new Error("Something Went Wrong")
    }
    try {
        const res = await apiClient.delete(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                data: {
                    tracks: [
                        {
                            uri,
                        },
                    ],
                    ...(snapshotId && { snapshot_id: snapshotId }),
                },
            }
        );
        if (res.data){
             onSuccess()

            toast.success('Successfully Removed')

        }
    }catch (e:any ) {
        if (e.status === 403) {
            throw new Error("Only owner can remove this Track")
        }
        throw e
    }
};

export const useDeleteTrackFromPlaylist = () => {

    return useMutation({
        mutationFn: deleteTrackFromPlaylist,
        onError:(error)=>{
            toast.error(error.message)

        },

    });
};
