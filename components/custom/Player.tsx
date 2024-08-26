import { useAudioContext } from "@/context/audioListContext";
import { useCurrentSongContext } from "@/context/CurrentSongContext";
import { useSongStatusContext } from "@/context/CurrentSongStatus";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import ProgessBar from "./ProgessBar";
import Image from "next/image";

export default function Player() {
    const { currentSong, setCurrentSong } = useCurrentSongContext();
    const { isPlaying, setIsPlaying } = useSongStatusContext()
    const { songs } = useAudioContext()
    const audioRef = useRef<HTMLAudioElement>(null)


    const setNextSong = useCallback(() => {

        if (currentSong) {
            let index = 0;
            for (let x = 0; x < songs.length; x++) {
                if (songs[x].name === currentSong.name) {
                    index = x;
                    break;
                }
            }

            if (index !== songs.length - 1) {
                setCurrentSong(songs[index + 1])
                setIsPlaying(true)

            } else {
                setCurrentSong(songs[0])
                setIsPlaying(true)

            }
        }
    }, [currentSong, setCurrentSong, songs, setIsPlaying])

    function setPreviousSong() {
        if (currentSong) {
            let index = 0;
            for (let x = 0; x < songs.length; x++) {
                if (songs[x].name === currentSong.name) {
                    index = x;
                    break;
                }
            }

            if (index !== 0) {
                setCurrentSong(songs[index - 1])
                setIsPlaying(true)

            } else {
                setCurrentSong(songs[songs.length - 1])
                setIsPlaying(true)
            }
        }
    }

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


    useEffect(() => {
        let audioCurrent = audioRef.current;
        const handleEndSong = () => {
            setNextSong()
        }
        audioCurrent?.addEventListener("ended", handleEndSong)

        return () => {
            audioCurrent?.addEventListener("ended", handleEndSong)
        }

    }, [setNextSong])


    return (
        <>
            {currentSong && (
                <div className="fixed bottom-0 w-full bg-black py-8 px-12 ">
                    <audio ref={audioRef} hidden />
                    <div className="absolute flex items-center space-x-2">
                        <Image src={URL.createObjectURL(currentSong.poster)} alt={currentSong.name} width={50} height={50} className="w-[50px] h-[50px] object-cover" />
                        <div>
                            <p className="font-semibold text-green-500">{currentSong.name}</p>
                            <p className="text-sm font-light">{currentSong.artist}</p>
                        </div>
                    </div>
                    <div className="flex justify-center flex-col items-center space-y-3">
                        <div className="flex items-center space-x-4">
                            <button onClick={setPreviousSong}>
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

                            <button onClick={setNextSong}>
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="w-96">
                            <ProgessBar audioRef={audioRef} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
