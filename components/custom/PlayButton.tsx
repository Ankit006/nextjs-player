import { useSongStatusContext } from "@/context/CurrentSongStatus";
import { Pause, Play } from "lucide-react";
import React from "react";

export default function PlayButton() {
  const { isPlaying, setIsPlaying } = useSongStatusContext();
  return (
    <button className="bg-green-500 rounded-full p-4" onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? (
        <Pause className="w-6 h-6 text-black" />
      ) : (
        <Play className="w-6 h-6 text-black" />
      )}
    </button>
  );
}
