
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../query/AxiosClientConfig.ts";

interface TransferPlaybackArgs {
    device_ids: string[];
    play?: boolean;
}

const transferPlayback = async ({ device_ids, play = true }: TransferPlaybackArgs) => {
    const res = await apiClient.put(
        "https://api.spotify.com/v1/me/player",
        { device_ids, play }
    );

    return res.data;
};

export const useTransferPlayback = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: transferPlayback,
        onSuccess,
    });
};
