import {useMutation} from '@tanstack/react-query';

import apiClient from "../../query/AxiosClientConfig.ts";
import {toast} from "sonner";


type CreatePlaylistPayload = {
    userId: string;
    name: string;
    description?: string;
    public?: boolean;

};

const createPlaylist = async ({
                                  userId,
                                  name,
                                  description,

                              }: CreatePlaylistPayload) => {

  try {
      const response = await apiClient.post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
              name: name,
              description: description,
              public: true
          },
      );


      return response.data;
  }catch (e) {
      console.log(e)
  }
};

export const useCreatePlaylist = () => {

    return useMutation({
        mutationFn: createPlaylist,
        onSuccess:()=>{
            toast.success('Playlist created')
        }
    });
};
