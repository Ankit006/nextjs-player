import { ISong } from "@/models/models";
import { Ellipsis, Heart } from "lucide-react";
import React from "react";
import PlayButton from "./PlayButton";
import UploadAudio from "./UploadAudio";

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <PlayButton />
                <Heart className="w-7 h-7" />
                <Ellipsis className="w-5 h-5" />
            </div>
            <div>
                <UploadAudio />
            </div>

        </div>
    );
}
