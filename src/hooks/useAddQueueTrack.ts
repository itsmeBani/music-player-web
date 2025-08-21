import { useMutation } from '@tanstack/react-query';
import apiClient, {API_BASE_URL} from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";



const AddQueueTrack = async (uri: string) => {
 try {
     const response = await apiClient.post(`${API_BASE_URL}/me/player/queue?uri=${uri}`);
     console.log(response.data)
     return response.data;
 }catch (e) {
     console.log(e)
     throw e
 }
};

export const useAddQueueTrack = () => {

    return useMutation({
        mutationFn:async (uri: string | undefined) => {
            if (!uri) return
          await   AddQueueTrack(uri)
        },
        onSuccess:()=> {
            toast.success('Added to Queue')
        },
        onError:()=> {
            toast.error('Something Went Wrong')

        }

    });
};
