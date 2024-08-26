import { ISong } from "@/models/models";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const CurrentSongContext = createContext<
  | {
      currentSong: ISong | undefined;
      setCurrentSong: Dispatch<SetStateAction<ISong | undefined>>;
    }
  | undefined
>(undefined);

export function useCurrentSongContext() {
  const context = useContext(CurrentSongContext);

  if (!context) {
    throw new Error(
      "useCurrentAudioContext must be used within CurrentAudioContext"
    );
  }

  return context;
}
