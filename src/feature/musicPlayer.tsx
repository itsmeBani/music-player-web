import { useAuth } from "@/context/AuthProvider.tsx";
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer.ts";
import { useEffect, useState } from "react";
import Track = Spotify.Track;
import { Slider } from "@/components/ui/slider";
import {
    SkipBack,
    SkipForward,
    PauseIcon,
    PlayIcon,Volume2, VolumeX, Volume1,
} from "lucide-react";

function MusicPlayer() {
    const { token } = useAuth();
    const { player} = useSpotifyPlayer(token);
    const [position, setPosition] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<Track>();
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isSeeking, setIsSeeking] = useState(false);

    const [volume, setVolume] = useState(100);

    useEffect(() => {
        if (!player) return;
        const listener = (state: Spotify.PlaybackState) => {
            if (!state) {
                console.log("No state yet");
                return;
            }
            const { position, duration, track_window, paused } = state;
            if (!isSeeking) {
                setPosition(position);
            }
            setCurrentTrack(track_window.current_track);
            setDuration(duration);
            setIsPlaying(!paused);
        };

        player.addListener("player_state_changed", listener);

        return () => {
            player.removeListener("player_state_changed", listener);
        };
    }, [player, isSeeking]);

    useEffect(() => {
        if (player) {
            player.setVolume(volume / 100).catch(err => console.error(err));
        }
    }, [volume, player]);

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
    };

    const progressPercent =
        duration > 0 ? Math.min((position / duration) * 100, 100) : 0;

    const pause = () => {
        player?.pause().then(() => console.log("Paused!"));
    };

    const resume = () => {
        player?.resume().then(() => console.log("Resumed!"));
    };

    const nextTrack = () => {
        player?.nextTrack().then(() => console.log("Skipped to next track!"));
    };

    const previousTrack = () => {
        player?.previousTrack().then(() =>
            console.log("Went back to previous track!")
        );
    };

    const handleSeek = (value: number[]) => {
        const newPercent = value[0];
        const newPosition = Math.floor((newPercent / 100) * duration);
        setPosition(newPosition);
    };

    const commitSeek = (value: number[]) => {
        const newPercent = value[0];
        const newPosition = Math.floor((newPercent / 100) * duration);
        player?.seek(newPosition).then(() => {
            console.log(`Seeked to ${newPosition}ms`);
        });
        setIsSeeking(false);
    };

    const startSeek = () => {
        setIsSeeking(true);
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };



    return (
        <div className="absolute  bg-[#006239] py-2 px-2 lg:p-2 lg:px-3 w-full left-0 bottom-0 border-[#00e673] border-t-1 rounded-t-lg">
            <div className="flex gap-2 justify-between">

                <div className="flex w-full gap-3 place-items-center">
                    <div className="w-13 h-13 bg-[#292929] rounded-md overflow-hidden">
                        {currentTrack?.album?.images?.[0]?.url && (
                            <img
                                className="w-full h-full object-cover"
                                src={currentTrack.album.images[0].url}
                                alt={currentTrack.name}
                            />
                        )}
                    </div>

                    <div>
                        <h1 className="lg:leading-5 leading-3 text-nowrap overflow-hidden max-w-[120px] lg:max-w-[200px] truncate text-sm lg:text-md PlusJakartaSans-Bold">
                            {currentTrack?.name}
                        </h1>
                        <p className="text-[13px] PlusJakartaSans-Regular text-nowrap overflow-hidden max-w-[120px]  truncate">
                            {currentTrack?.artists?.map((a) => a.name).join(", ")}
                        </p>
                    </div>
                </div>


                <div className="flex w-full pt-2">
                    <div className="w-full flex gap-2 flex-col ">
                        <div className="flex gap-2 lg:gap-5 justify-center h-full">
                            <button onClick={previousTrack}>
                                <SkipBack strokeWidth={4} />
                            </button>

                            {isPlaying ? (
                                <button onClick={pause}>
                                    <PauseIcon strokeWidth={3} />
                                </button>
                            ) : (
                                <button onClick={resume}>
                                    <PlayIcon strokeWidth={4} />
                                </button>
                            )}

                            <button onClick={nextTrack}>
                                <SkipForward strokeWidth={4} />
                            </button>
                        </div>


                        <div className={"flex gap-2"}>
                            <p className="text-xs PlusJakartaSans-SemiBold">{formatTime(position)}</p>
                            <Slider
                                value={[progressPercent]}
                                max={100}
                                step={1}
                                onValueChange={handleSeek}
                                onValueCommit={commitSeek}
                                onPointerDown={startSeek}
                            />
                            <p className="text-xs PlusJakartaSans-SemiBold">{formatTime(duration)}</p>
                        </div>

                    </div>
                </div>

                <div className={"w-full hidden gap-2 pr-3 lg:flex justify-end place-items-center"}>


                    {volume === 0 ? <VolumeX size={30}/>
                        : volume <= 70 ? <Volume1 size={30}/>
                            : <Volume2 size={30}/> }
                    <Slider
                        className="w-[170px]"
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                    /> <p className={"PlusJakartaSans-Bold text-xs"}>{volume}%</p>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
