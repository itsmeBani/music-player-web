import { useEffect, useState } from "react";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {fetchActiveDevices} from "../../query/fetchDevices.ts";
import {useTransferPlayback} from "@/hooks/useTransferPlayback.ts";
import apiClient from "../../query/AxiosClientConfig.ts";
type PlaySpotifyTrackInput = {
    contextUri: string | undefined;
    progress_ms: number;
};

export function useSpotifyPlayer(token: string | null | undefined) {
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const  {data:listOfDevices,refetch:refetchDevices}  = useQuery(fetchActiveDevices());
     const queryClient=new QueryClient()

    const { mutate } = useTransferPlayback(() => {
        setTimeout(()=>{
            refetchDevices().then()
        },300)
    });


    useEffect(() => {
        if (!token) return;

        if (!document.getElementById("spotify-sdk")) {
            const scriptTag = document.createElement("script");
            scriptTag.id = "spotify-sdk";
            scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
            scriptTag.async = true;
            document.body.appendChild(scriptTag);
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const newPlayer = new window.Spotify.Player({
                name: "React Spotify Player",
                getOAuthToken: cb => cb(token), // will be called automatically
                volume: 0.5,
            });


            newPlayer.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                mutate({ device_ids: [device_id] })
                setDeviceId(device_id);
                setIsReady(true);


            });

            newPlayer.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
                setIsReady(false);
            });

            newPlayer.addListener("initialization_error", ({ message }) =>
                console.error("Init error:", message)
            );
            newPlayer.addListener("authentication_error", ({ message }) =>
                console.error("Auth error:", message)
            );
            newPlayer.addListener("account_error", ({ message }) =>
                console.error("Account error:", message)
            );

            newPlayer.connect().then();
            setPlayer(newPlayer);

            return () => {
                newPlayer.disconnect();
            };
        };
    }, [token]);


    const Play = useMutation<void, Error, PlaySpotifyTrackInput>({
        mutationFn: async ({contextUri, progress_ms}) => {
            if (!contextUri) return
            if (!deviceId) throw new Error('No active Spotify device found.');
            await apiClient.put(
                `https://api.spotify.com/v1/me/player/play?device_id=${"6ea5a09a7d603efa553891aeb9f9ff62dc061b77"}`,
                {
                    uris: [contextUri],
                    position_ms: progress_ms,
                }
            );
        },
        onMutate: async () => await queryClient.cancelQueries({queryKey: ["current-track"]}),

        onSuccess: () => console.log("succ"),
        onError: (err) => {
            console.log('Error playing track:', err)
        },
    });


    return { player,Play, deviceId, isReady,listOfDevices,refetchDevices };
}





