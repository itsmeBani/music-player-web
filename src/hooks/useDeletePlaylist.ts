
import { useMutation } from "@tanstack/react-query";

import apiClient from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";

type removePlayListProp={
    playlistId: string | null,
    onSuccessRemove:()=>void
}
const removePlaylist=async ({playlistId,onSuccessRemove}:removePlayListProp)=> {


    if (!playlistId) {
        throw new Error("Something Went Wrong");
    }

    try {
        const response=await apiClient.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`);
        //if no error the response is empty
        if (!response.data){
            onSuccessRemove()
            toast.success('Successfully Remove')

        }
    }catch (e){
        console.log(e)
        throw e
    }
}


export const useRemovePlaylist = () => {

    return useMutation({
        mutationFn:removePlaylist,
        onError: (error: any) => {
            toast.error(error)

            },
    });
};

