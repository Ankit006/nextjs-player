import { useAudioContext } from "@/context/audioListContext";
import SongCard from "./SongCard";

export default function SongList() {
    const { songs } = useAudioContext()
    return (
        <div className="flex flex-col space-y-8">
            {songs.map((song, index) => <SongCard key={index} index={index} song={song} />)}
        </div>
    )
}
