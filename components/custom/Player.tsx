import { useCurrentSongContext } from "@/context/CurrentSongContext";
import { useSongStatusContext } from "@/context/CurrentSongStatus";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Player() {
    const { currentSong } = useCurrentSongContext();
    const { isPlaying, setIsPlaying } = useSongStatusContext()
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.src = URL.createObjectURL(currentSong.audio);
        }
    }, [currentSong])

    useEffect(() => {
        if (isPlaying && currentSong) {
            if (audioRef.current) {

                audioRef.current.play();
            }
        }

        if (!isPlaying && currentSong) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong])
    return (
        <>
            {currentSong && (
                <div className="fixed bottom-0 w-full bg-black py-8 px-12 ">
                    <audio ref={audioRef} hidden />
                    <div className="absolute">
                        <p className="font-semibold text-green-500">{currentSong.name}</p>
                        <p className="text-sm font-light">{currentSong.artist}</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-4">
                            <button>
                                <SkipBack className="w-5 h-5" />
                            </button>
                            {isPlaying ? <button onClick={() => {
                                setIsPlaying(false)
                            }}>
                                <Pause className="w-5 h-5" />
                            </button> : <button onClick={() => {
                                setIsPlaying(true)
                            }}>
                                <Play className="w-5 h-5" /></button>}

                            <button>
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
