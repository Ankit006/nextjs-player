import { ISong } from "@/models/models";
import { Ellipsis, Grid, Heart, LayoutGrid, List } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import PlayButton from "./PlayButton";
import UploadAudio from "./UploadAudio";

export default function Header({ setSongListView, songListView }: { setSongListView: Dispatch<SetStateAction<"list" | "grid">>; songListView: "list" | "grid" }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <PlayButton />
                <Heart className="w-7 h-7" />
                <Ellipsis className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-4">
                {songListView === "grid" ? <button onClick={() => setSongListView("list")}>
                    <List />
                </button> : <button onClick={() => setSongListView("grid")}>
                    <LayoutGrid /></button>}
                <UploadAudio />
            </div>

        </div>
    );
}
