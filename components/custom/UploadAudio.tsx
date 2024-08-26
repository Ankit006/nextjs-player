"use client";

import { useAudioContext } from "@/context/audioListContext";
import { getAudioLength, isAudio } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ErrorText from "./ErrorText";
import { ISongFormError, validateSongForm } from "@/validation/validation";

export default function UploadAudio() {

    const { setSongs } = useAudioContext()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<ISongFormError | undefined>(undefined);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const audio = form.get("audio");
        let duration = "";

        if (audio instanceof File && audio.size > 0 && isAudio(audio.type)) {
            duration = await getAudioLength(audio);
        }
        form.set("duration", duration);
        const validData = validateSongForm.safeParse(Object.fromEntries(form));

        if (!validData.success) {
            setError(validData.error.flatten().fieldErrors as ISongFormError)
        } else {
            if (validData.data) {
                setSongs(prevState => [...prevState, validData.data])
            }

            setOpen(false)
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Upload className="w-61 h-6 text-white cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Audio</DialogTitle>
                    <DialogDescription>
                        Please upload audio file and a cover image
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Song name</Label>
                        <Input id="name" name="name" />
                        {error?.name && (
                            <ErrorText text={error.name[0]} />
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="artist">Artist</Label>
                        <Input id="artist" name="artist" />
                        {error?.artist && (
                            <ErrorText text={error.artist[0]} />
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="audio">Audio file</Label>
                        <Input
                            id="audio"
                            type="file"
                            name="audio"
                            className=" file:text-white"
                        />
                        {error?.audio && (
                            <ErrorText text={error.audio[0]} />
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="poster">Poster</Label>
                        <Input
                            id="poster"
                            type="file"
                            name="poster"
                            className="mt-2 file:text-white"
                        />
                        {error?.poster && (
                            <ErrorText text={error.poster[0]} />
                        )}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" className="bg-green-500 ">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
