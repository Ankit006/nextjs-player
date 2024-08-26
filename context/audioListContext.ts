import { ISong } from "@/models/models";
import React, { createContext, useContext } from "react";

export const AudioListContext = createContext<
  | { songs: ISong[]; setSongs: React.Dispatch<React.SetStateAction<ISong[]>> }
  | undefined
>(undefined);

export function useAudioContext() {
  const context = useContext(AudioListContext);

  if (!context) {
    throw new Error("useAudioContext must be used within AudioListContext");
  }

  return context;
}
